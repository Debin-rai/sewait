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
        const { gold24, gold22, silver } = body;

        // --- Audit Log ---
        console.log(`[AUDIT] Admin (${session.user?.email}) updated GOLD RATES: ${gold24}/${gold22}/${silver}`);

        const rate = await prisma.goldRate.create({
            data: {
                gold24: parseFloat(gold24),
                gold22: gold22 ? parseFloat(gold22) : null,
                silver: parseFloat(silver),
                date: new Date(),
            },
        });

        return NextResponse.json(rate);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update rates' }, { status: 500 });
    }
}
