"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import AdSlot from "@/components/ads/AdSlot";

export default function WeatherClient() {
    const { t } = useLanguage();
    const [weather, setWeather] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchWeather = async (lat?: number, lon?: number) => {
        setLoading(true);
        try {
            const url = lat && lon
                ? `/api/weather?lat=${lat}&lon=${lon}`
                : `/api/weather`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.status === 'missing_config') {
                setWeather({ error: 'CONFIG_REQUIRED' });
            } else if (!data.error) {
                setWeather(data);
            } else {
                setWeather({ error: 'FETCH_FAILED' });
            }
        } catch (err) {
            console.error("Weather fetch failed", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (pos) => fetchWeather(pos.coords.latitude, pos.coords.longitude),
                () => fetchWeather() // Fallback
            );
        } else {
            fetchWeather();
        }
    }, []);

    const formatTime = (timestamp: number) => {
        if (!timestamp) return "--:--";
        return new Date(timestamp * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getDayName = (dt: number) => {
        return new Date(dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen text-slate-900 pb-12 overflow-x-hidden">
            {/* Custom Animations CSS */}
            <style jsx global>{`
                @keyframes rotate-sun {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes float-cloud {
                    0%, 100% { transform: translateX(0) translateY(0); }
                    50% { transform: translateX(20px) translateY(-10px); }
                }
                @keyframes rain-drop {
                    0% { transform: translateY(-20px); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100px); opacity: 0; }
                }
                @keyframes lightning {
                    0%, 90%, 100% { opacity: 0; }
                    92%, 95% { opacity: 1; }
                }
                .anim-sun { animation: rotate-sun 20s linear infinite; }
                .anim-cloud { animation: float-cloud 8s ease-in-out infinite; }
                .rain-container .drop { 
                    position: absolute; width: 2px; height: 15px; background: rgba(59, 130, 246, 0.4); 
                    animation: rain-drop 1s linear infinite;
                }
                .lightning-flash {
                    position: absolute; inset: 0; background: white; opacity: 0;
                    animation: lightning 5s infinite; pointer-events: none; z-index: 10;
                }
            `}</style>

            <main className="max-w-[1500px] mx-auto px-6 py-10">
                {/* Header */}
                <div className="mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                        <div className="flex items-center gap-2 text-primary">
                            <span className="material-symbols-outlined text-base">location_on</span>
                            <span className="text-sm font-black uppercase tracking-wider">Live Weather Station</span>
                        </div>
                        <h1 className="mt-1 text-5xl font-black tracking-tight text-slate-900 nepali-font">
                            {loading ? "लोड हुँदै..." : (weather?.current?.city ? `${weather.current.city}, नेपाल` : (weather?.error === 'CONFIG_REQUIRED' ? "Config Needed" : t.hero.kathmandu_nepal))}
                        </h1>
                        <p className="mt-2 text-sm text-slate-500 font-semibold uppercase tracking-wide">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })} • {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => fetchWeather()} className="size-14 flex items-center justify-center rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group">
                            <span className="material-symbols-outlined text-slate-600 group-hover:rotate-180 transition-transform duration-500">refresh</span>
                        </button>
                        <button className="px-8 flex items-center gap-3 rounded-2xl bg-slate-900 text-white font-black shadow-xl hover:bg-slate-800 transition-all active:scale-95">
                            <span className="material-symbols-outlined text-xl">map</span> Explore Maps
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

                    {/* COLUMN 1: FUTURE (Left) */}
                    <div className="lg:col-span-3 space-y-6 flex flex-col order-2 lg:order-1">
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex-1 overflow-hidden relative group">
                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary">event_upcoming</span>
                                Future <span className="text-slate-400 font-bold ml-1">Forecast</span>
                            </h3>

                            <div className="space-y-6">
                                {loading ? (
                                    Array(7).fill(0).map((_, i) => (
                                        <div key={i} className="animate-pulse flex items-center justify-between">
                                            <div className="h-4 w-12 bg-slate-100 rounded"></div>
                                            <div className="size-10 bg-slate-50 rounded-full"></div>
                                            <div className="h-4 w-16 bg-slate-100 rounded"></div>
                                        </div>
                                    ))
                                ) : (weather?.forecast?.length > 0 ? weather.forecast.slice(1).map((day: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between group/day cursor-default hover:bg-slate-50/50 p-2 rounded-2xl transition-all">
                                        <span className="w-12 text-sm font-black text-slate-400 uppercase tracking-widest">{getDayName(day.dt)}</span>
                                        <div className="flex-1 flex justify-center">
                                            <span className={`material-symbols-outlined text-3xl opacity-80 group-hover/day:scale-125 transition-transform duration-500 ${day.condition.toLowerCase().includes('rain') ? 'text-blue-400' :
                                                day.condition.toLowerCase().includes('cloud') ? 'text-slate-400' : 'text-amber-400'}`}>
                                                {day.condition.toLowerCase().includes('rain') ? 'rainy' :
                                                    day.condition.toLowerCase().includes('cloud') ? 'cloudy' : 'sunny'}
                                            </span>
                                        </div>
                                        <div className="w-20 text-right">
                                            <span className="text-base font-black text-slate-800">{day.temp.max}°</span>
                                            <span className="text-xs font-bold text-slate-300 ml-2">{day.temp.min}°</span>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="text-center py-20 text-slate-300 font-bold uppercase text-[10px] tracking-widest">Forecast Unavailable</div>
                                ))}
                            </div>

                            <div className="mt-8 pt-6 border-t border-slate-50 flex justify-center">
                                <button className="text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:tracking-[0.3em] transition-all">View 14-Day View</button>
                            </div>
                        </div>
                    </div>

                    {/* COLUMN 2: CURRENT (Middle) */}
                    <div className="lg:col-span-6 order-1 lg:order-2">
                        <div className="relative h-full min-h-[500px] lg:min-h-[700px] bg-white rounded-[40px] shadow-2xl overflow-hidden border border-slate-100 flex flex-col py-16 px-8 items-center text-center">

                            {/* Weather Stage (Animations) */}
                            <div className="absolute inset-x-0 top-0 h-2/3 flex items-center justify-center pointer-events-none overflow-hidden select-none">
                                {weather?.current?.condition?.toLowerCase().includes('rain') && (
                                    <div className="rain-container absolute inset-0">
                                        {Array(50).fill(0).map((_, i) => (
                                            <div key={i} className="drop" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s` }}></div>
                                        ))}
                                    </div>
                                )}
                                {weather?.current?.condition?.toLowerCase().includes('storm') && <div className="lightning-flash" />}

                                <div className="relative scale-150 lg:scale-[2.5]">
                                    {weather?.current?.condition?.toLowerCase().includes('clear') || weather?.current?.condition?.toLowerCase().includes('sun') ? (
                                        <div className="anim-sun relative">
                                            <span className="material-symbols-outlined text-amber-400 text-[180px] drop-shadow-[0_0_50px_rgba(251,191,36,0.5)]">wb_sunny</span>
                                        </div>
                                    ) : weather?.current?.condition?.toLowerCase().includes('rain') ? (
                                        <div className="anim-cloud">
                                            <span className="material-symbols-outlined text-blue-400 text-[180px] drop-shadow-[0_0_50px_rgba(96,165,250,0.3)]">rainy</span>
                                        </div>
                                    ) : (
                                        <div className="anim-cloud">
                                            <span className="material-symbols-outlined text-slate-300 text-[180px] drop-shadow-[0_0_50px_rgba(203,213,225,0.4)]">cloudy</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Center Content */}
                            <div className="relative z-10 mt-auto w-full">
                                {loading ? (
                                    <div className="animate-pulse flex flex-col items-center">
                                        <div className="h-32 w-48 bg-slate-50 rounded-3xl mb-4"></div>
                                        <div className="h-6 w-32 bg-slate-50 rounded-lg"></div>
                                    </div>
                                ) : weather?.error === 'CONFIG_REQUIRED' ? (
                                    <div className="flex flex-col items-center max-w-xs mx-auto">
                                        <div className="size-20 bg-amber-50 rounded-3xl flex items-center justify-center text-amber-500 mb-6 ring-8 ring-amber-50/50">
                                            <span className="material-symbols-outlined text-4xl font-black">lock</span>
                                        </div>
                                        <p className="font-black text-slate-800 uppercase tracking-widest text-xs mb-2">Service Locked</p>
                                        <p className="text-slate-500 font-bold text-sm">Please insert your <span className="text-primary underline">OpenWeather API Key</span> in the admin settings.</p>
                                    </div>
                                ) : (
                                    <div className="animate-in slide-in-from-bottom duration-700">
                                        <div className="flex items-start justify-center">
                                            <span className="text-[120px] lg:text-[220px] font-black tracking-tighter text-slate-900 leading-[0.8] drop-shadow-sm select-none">
                                                {weather?.current?.temp ?? "--"}
                                            </span>
                                            <span className="mt-4 lg:mt-10 text-4xl lg:text-7xl font-black text-slate-200">°C</span>
                                        </div>
                                        <p className="mt-8 text-2xl lg:text-4xl font-black text-slate-600 nepali-font drop-shadow-sm">
                                            {weather?.current?.description || "जानकारी प्राप्त भएन"}
                                        </p>
                                        <div className="mt-10 flex justify-center gap-12">
                                            <div className="text-center group cursor-default">
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-amber-500 transition-colors">Max Temp</p>
                                                <p className="text-xl font-black text-slate-700">{weather?.current?.temp ? weather.current.temp + 2 : "--"}°</p>
                                            </div>
                                            <div className="size-px h-10 bg-slate-100 my-auto"></div>
                                            <div className="text-center group cursor-default">
                                                <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Min Temp</p>
                                                <p className="text-xl font-black text-slate-700">{weather?.current?.temp ? weather.current.temp - 3 : "--"}°</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Wave Decorative (optional) */}
                            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-50/50 to-transparent pointer-events-none"></div>
                        </div>
                    </div>

                    {/* COLUMN 3: PAST & DETAILS (Right) */}
                    <div className="lg:col-span-3 space-y-8 flex flex-col order-3">

                        {/* Past Snapshot */}
                        <div className="bg-slate-900 rounded-[32px] p-8 shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-1000">
                                <span className="material-symbols-outlined text-[80px] text-white">history</span>
                            </div>
                            <h3 className="relative z-10 text-white/50 font-black text-[10px] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
                                <span className="size-2 bg-indigo-500 rounded-full animate-pulse"></span>
                                Yesterday's Snapshot
                            </h3>
                            {loading ? (
                                <div className="space-y-4 animate-pulse">
                                    <div className="h-12 w-full bg-white/5 rounded-2xl"></div>
                                    <div className="h-6 w-2/3 bg-white/5 rounded-xl"></div>
                                </div>
                            ) : weather?.past ? (
                                <div className="relative z-10">
                                    <div className="flex items-center gap-6">
                                        <span className="text-5xl font-black text-white">{weather.past.temp}°</span>
                                        <span className="material-symbols-outlined text-white/20 text-4xl">
                                            {weather.past.condition.toLowerCase().includes('rain') ? 'rainy' : 'cloudy'}
                                        </span>
                                    </div>
                                    <p className="mt-4 text-xs font-bold text-white/40 leading-relaxed">
                                        Yesterday was <span className="text-indigo-400">{weather.past.temp > weather?.current?.temp ? 'warmer' : 'cooler'}</span> than today with a humidity level of {weather.past.humidity}%.
                                    </p>
                                </div>
                            ) : (
                                <div className="relative z-10 text-white/20 font-black italic text-xs py-4">History data unavailable for current plan.</div>
                            )}
                        </div>

                        {/* Detailed Metrics */}
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex-1 grid grid-cols-1 gap-4">
                            {[
                                { label: "Humidity", value: weather?.current?.humidity ? `${weather.current.humidity}%` : "--", icon: "water_drop", color: "bg-blue-50 text-blue-500" },
                                { label: "Wind Speed", value: weather?.current?.wind ? `${weather.current.wind} km/h` : "--", icon: "air", color: "bg-teal-50 text-teal-500" },
                                { label: "UV Index", value: weather?.current?.uv || "Low", icon: "wb_sunny", color: "bg-amber-50 text-amber-500" },
                                { label: "Visibility", value: "10 km", icon: "visibility", color: "bg-indigo-50 text-indigo-500" }
                            ].map((m, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 rounded-3xl border border-slate-100/50 group hover:bg-white hover:shadow-lg transition-all cursor-default">
                                    <div className="flex items-center gap-4">
                                        <div className={`size-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${m.color}`}>
                                            <span className="material-symbols-outlined font-black">{m.icon}</span>
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{m.label}</p>
                                            <p className="text-base font-black text-slate-800">{m.value}</p>
                                        </div>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity">arrow_forward</span>
                                </div>
                            ))}
                        </div>

                        {/* Astronomy Snapshot */}
                        <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-orange-50/30 rounded-3xl border border-orange-100/50">
                                <span className="material-symbols-outlined text-orange-500 text-xl font-black mb-2">wb_sunny</span>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sunrise</p>
                                <p className="text-sm font-black text-slate-800">{formatTime(weather?.current?.sunrise)}</p>
                            </div>
                            <div className="text-center p-4 bg-indigo-50/30 rounded-3xl border border-indigo-100/50">
                                <span className="material-symbols-outlined text-indigo-500 text-xl font-black mb-2">wb_twilight</span>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Sunset</p>
                                <p className="text-sm font-black text-slate-800">{formatTime(weather?.current?.sunset)}</p>
                            </div>
                        </div>

                        <AdSlot position="WEATHER_SIDEBAR" className="aspect-square w-full" />
                    </div>
                </div>

                {/* Advertisement Slot */}
                <div className="mt-12">
                    <AdSlot position="WEATHER_BOTTOM" className="w-full aspect-[6/1]" />
                </div>

                {/* Footer Disclaimer */}
                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">
                        Data provided by OpenWeatherMap API • Visualized by SewaIT Engine 3.0
                    </p>
                </div>
            </main>
        </div>
    );
}
