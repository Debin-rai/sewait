import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Assuming lib/prisma exists, otherwise will check
import NepaliDate from "nepali-date-converter";

// Helper to get days in a BS month
// NepaliDate converter might have this, or we rely on a manual map if the library implies it.
// Actually, nepali-date-converter instances give us info.

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const yearStr = searchParams.get("year");
    const monthStr = searchParams.get("month");

    if (!yearStr || !monthStr) {
        return NextResponse.json({ error: "Year and month are required" }, { status: 400 });
    }

    const year = parseInt(yearStr);
    const month = parseInt(monthStr); // 1-12

    if (isNaN(year) || isNaN(month) || month < 1 || month > 12) {
        return NextResponse.json({ error: "Invalid year or month" }, { status: 400 });
    }

    try {
        // 1. Calculate Base Calendar Data for the Month
        // We need to know:
        // - Start weekday of the month
        // - Number of days in the month
        // - Details for each day

        // Library uses 0-indexed months typically? Let's check or assume standard 0-11 for JS.
        // Documentation usually says: new NepaliDate(2081, 0, 1) is Baisakh 1.
        const bsMonthIndex = month - 1;

        // Get number of days in this month
        // We can iterate until the month changes? Or use library function if available.
        // A robust way without knowing internal API is to loop.
        const daysInMonth = [];
        // Start from day 1
        let currentDay = 1;

        // We need to find the AD date for BS year-month-01 to query DB potentially?
        // Actually, we store `bsDate` string in DB "YYYY-MM-DD".

        // Using a loop to generate the grid
        // Note: This reliance on the library is keen. references `nepali-date-converter`

        // We need the number of days in the month.
        // We can try creating date for day 32, if it rolls over, we know.
        // Actually, let's just generate the whole month.

        // Find the weekday of the 1st day
        const firstDayOfBsMonth = new NepaliDate(year, bsMonthIndex, 1);
        const startWeekday = firstDayOfBsMonth.getDay(); // 0 = Sunday

        // Get last day by trying to go to next month day 0? 
        // Or just loop 32 times.
        let lastDay = 29;
        for (let d = 29; d <= 32; d++) {
            try {
                const date = new NepaliDate(year, bsMonthIndex, d);
                if (date.getMonth() === bsMonthIndex) {
                    lastDay = d;
                } else {
                    break;
                }
            } catch (e) {
                break;
            }
        }

        // 2. Fetch Events from Database
        // Query where bsDate starts with "YYYY-MM"
        // Format: "2081-01" for Baisakh
        const paddedMonth = month.toString().padStart(2, "0");
        const bsMonthPrefix = `${year}-${paddedMonth}`;

        const dbDays = await prisma.calendarDay.findMany({
            where: {
                bsDate: {
                    startsWith: bsMonthPrefix,
                },
            },
            include: {
                events: true,
            },
        });

        // Create a map for efficient lookup
        const dbDayMap = new Map();
        dbDays.forEach((day) => {
            dbDayMap.set(day.bsDate, day);
        });

        // 3. Construct Response
        const grid = [];

        for (let d = 1; d <= lastDay; d++) {
            const bsDateObj = new NepaliDate(year, bsMonthIndex, d);
            const adDate = bsDateObj.toJsDate();

            const paddedDay = d.toString().padStart(2, '0');
            const bsDateString = `${year}-${paddedMonth}-${paddedDay}`;

            const dbDay = dbDayMap.get(bsDateString);

            // Merge data
            grid.push({
                bsDay: d,
                bsDate: bsDateString,
                adDate: adDate, // Send AD date for frontend reference
                weekDay: bsDateObj.getDay(),
                events: dbDay?.events || [], // List of events
                isPublicHoliday: dbDay?.events.some((e: any) => e.isPublicHoliday) || (bsDateObj.getDay() === 6), // Saturday is holiday usually
                tithi: dbDay?.tithi || null,
            });
        }

        return NextResponse.json({
            year,
            month,
            daysInMonth: lastDay,
            startWeekday,
            days: grid,
        });

    } catch (error) {
        console.error("Calendar API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
