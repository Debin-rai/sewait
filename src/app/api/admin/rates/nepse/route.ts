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
        const { index, change, percentChange, turnover, status } = body;

        // --- Audit Log ---
        console.log(`[AUDIT] Admin (${session.user?.email}) updated NEPSE: ${index} (${change})`);

        const nepse = await prisma.nepseData.create({
            data: {
                index: parseFloat(index),
                change: parseFloat(change),
                percentChange: parseFloat(percentChange),
                turnover: turnover ? parseFloat(turnover) : null,
                status: status || "Open",
            },
        });

        return NextResponse.json(nepse);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update NEPSE data' }, { status: 500 });
    }
}
