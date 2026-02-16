import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Determine today's date or fetch based on query params
        // For Phase 1 MVP, we might just return static data or fetch from DB if populated
        // Since we don't have the Nepali Date logic yet, let's return mock or DB data

        // Example: Fetch upcoming festivals
        const festivals = await prisma.festival.findMany({
            where: {
                date: {
                    gte: new Date(),
                },
            },
            orderBy: {
                date: 'asc',
            },
            take: 5,
        });

        return NextResponse.json({
            today: {
                nepaliDate: "२०८० कार्तिक १५",
                nepaliDay: "बुधबार",
                tithi: "एकादशी",
                events: ["दशैं आउन ५ दिन बाँकी"],
            },
            upcomingFestivals: festivals,
        });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch calendar data' }, { status: 500 });
    }
}
