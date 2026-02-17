import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function POST(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, nepaliDate, date, description, isHoliday } = body;

        // --- Audit Log ---
        console.log(`[AUDIT] Admin (${session.user?.email}) created FESTIVAL: ${name}`);

        const festival = await prisma.festival.create({
            data: {
                name,
                nepaliDate,
                date: new Date(date),
                description,
                isHoliday: isHoliday || false,
            },
        });

        return NextResponse.json(festival);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create festival' }, { status: 500 });
    }
}

export async function GET() {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const festivals = await prisma.festival.findMany({
            orderBy: { date: 'desc' }
        });
        return NextResponse.json(festivals);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch festivals' }, { status: 500 });
    }
}
