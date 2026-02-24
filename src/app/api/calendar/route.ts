import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import NepaliDate from 'nepali-date-converter';
import { toNepaliNumber } from '@/lib/nepaliDate';

export async function GET() {
    try {
        const now = new NepaliDate();
        const year = now.getYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        const paddedMonth = month.toString().padStart(2, "0");
        const paddedDay = day.toString().padStart(2, "0");
        const bsDateStr = `${year}-${paddedMonth}-${paddedDay}`;

        const dbDay = await prisma.calendarDay.findUnique({
            where: { bsDate: bsDateStr },
            include: { events: true }
        });

        const dayNamesNp = ["आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"];
        const monthNamesNp = ["वैशाख", "जेठ", "असार", "साउन", "भदौ", "असोज", "कात्तिक", "मंसिर", "पुस", "माघ", "फागुन", "चैत"];

        return NextResponse.json({
            today: {
                nepaliDate: `${toNepaliNumber(year)} ${monthNamesNp[now.getMonth()]} ${toNepaliNumber(day)}`,
                nepaliDay: dayNamesNp[now.getDay()],
                tithi: dbDay?.tithi || "पञ्चमी", 
                events: dbDay?.events.map(e => e.name) || [],
            },
            upcomingFestivals: [], 
        });
    } catch (error) {
        console.error("Calendar API error:", error);
        return NextResponse.json({ error: 'Failed to fetch calendar data' }, { status: 500 });
    }
}
