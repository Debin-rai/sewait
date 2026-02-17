import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// Simple in-memory cache
const cache = new Map<string, { data: any, timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const lat = searchParams.get('lat') || '27.7172'; // Default Kathmandu lat
        const lon = searchParams.get('lon') || '85.3240'; // Default Kathmandu lon
        const cacheKey = `${lat},${lon}`;

        // Check cache first
        const cached = cache.get(cacheKey);
        if (cached && (Date.now() - cached.timestamp < CACHE_TTL)) {
            return NextResponse.json(cached.data);
        }

        // Get Configs (API Key & Module Status)
        const configs = await prisma.systemConfig.findMany({
            where: {
                key: { in: ['API_WEATHER', 'MODULE_WEATHER'] }
            }
        });

        const apiKey = configs.find(c => c.key === 'API_WEATHER')?.value;
        const isEnabled = configs.find(c => c.key === 'MODULE_WEATHER')?.value === 'true';

        if (!isEnabled && apiKey) {
            // If disabled but key exists, potentially return error or empty? 
            // For now, let's allow it if key exists but maybe frontend handles 'disabled' UI
        }

        if (!apiKey) {
            return NextResponse.json({ error: 'Weather API key not configured' }, { status: 500 });
        }

        // Use One Call API 3.0 for precise daily data
        const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        if (!response.ok) {
            const errorData = await response.json();
            // Fallback to 2.5 Current Weather if 3.0 fails (e.g., subscription issue)
            if (response.status === 401) {
                console.warn("One Call 3.0 failed (401), trying 2.5 as fallback");
                const fallbackUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
                const fbRes = await fetch(fallbackUrl);
                if (!fbRes.ok) throw new Error("Fallback API failed");
                const fbData = await fbRes.json();
                const result = {
                    temp: Math.round(fbData.main.temp),
                    condition: fbData.weather[0].main,
                    description: fbData.weather[0].description,
                    city: fbData.name,
                    sunrise: fbData.sys.sunrise,
                    sunset: fbData.sys.sunset,
                    humidity: fbData.main.humidity,
                    wind: fbData.wind.speed
                };
                // Cache result
                cache.set(cacheKey, { data: result, timestamp: Date.now() });
                return NextResponse.json(result);
            }
            return NextResponse.json({ error: errorData.message || 'Failed to fetch weather data' }, { status: response.status });
        }

        const data = await response.json();

        const result = {
            temp: Math.round(data.current.temp),
            condition: data.current.weather[0].main,
            description: data.current.weather[0].description,
            city: data.timezone.split('/')[1]?.replace('_', ' ') || 'Local', // OneCall doesn't return city name directly, usually timezone
            sunrise: data.daily[0].sunrise,
            sunset: data.daily[0].sunset,
            humidity: data.current.humidity,
            wind: data.current.wind_speed
        };

        // Cache result
        cache.set(cacheKey, { data: result, timestamp: Date.now() });

        return NextResponse.json(result);

    } catch (error) {
        console.error("Weather API Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
