import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// import { getServerSession } from "next-auth"; // Assuming auth setup
// import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Path depends on implementation
import { z } from "zod";

// Schema for validation
// Only validating the array structure, not every field deeply to keep it fast
const eventSchema = z.object({
    name: z.string(),
    type: z.string().optional(),
    description: z.string().optional(),
    isPublicHoliday: z.boolean().default(false),
});

const daySchema = z.object({
    bsDate: z.string(),
    adDate: z.string(), // ISO string
    tithi: z.string().optional(),
    sunrise: z.string().optional(),
    events: z.array(eventSchema).optional(),
});

const bulkUploadSchema = z.array(daySchema);

export async function POST(req: NextRequest) {
    try {
        // 1. Auth Check (Basic check for now, can be enhanced)
        // const session = await getServerSession(authOptions);
        // if (!session || session.user.role !== "ADMIN") {
        //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const body = await req.json();
        const result = bulkUploadSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: "Invalid data format", details: result.error.format() }, { status: 400 });
        }

        const data = result.data;

        // 2. Transactional Update
        // For each day in the upload, we upsert CalendarDay
        // and recreate events (delete existing for that day, add new)

        // This could be heavy for 365 days. Let's do it in a transaction.
        // Ideally we batch this or limit size. Assuming yearly upload (~365 items).

        await prisma.$transaction(async (tx) => {
            for (const day of data) {

                // Upsert Day
                const dbDay = await tx.calendarDay.upsert({
                    where: { bsDate: day.bsDate },
                    update: {
                        adDate: new Date(day.adDate),
                        tithi: day.tithi,
                        sunrise: day.sunrise,
                        // sunset: day.sunset // if in schema
                    },
                    create: {
                        bsDate: day.bsDate,
                        adDate: new Date(day.adDate),
                        tithi: day.tithi,
                        sunrise: day.sunrise,
                    },
                });

                // Manage Events
                // Delete existing events for this day to avoid duplicates if re-uploading
                await tx.calendarEvent.deleteMany({
                    where: { dayId: dbDay.id },
                });

                if (day.events && day.events.length > 0) {
                    await tx.calendarEvent.createMany({
                        data: day.events.map((e) => ({
                            dayId: dbDay.id,
                            name: e.name,
                            type: e.type || "FESTIVAL",
                            description: e.description,
                            isPublicHoliday: e.isPublicHoliday,
                        })),
                    });
                }
            }
        });

        return NextResponse.json({ message: "Bulk upload successful", count: data.length });
    } catch (error) {
        console.error("Bulk Upload Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
