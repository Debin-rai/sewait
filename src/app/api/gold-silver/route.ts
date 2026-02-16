import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const latestRate = await prisma.goldRate.findFirst({
            orderBy: {
                date: 'desc',
            },
        });

        if (!latestRate) {
            // Return dummy data if DB empty
            return NextResponse.json({
                gold24: 118000,
                gold22: 117450,
                silver: 1400,
                date: new Date().toISOString(),
                trend: "down"
            });
        }

        return NextResponse.json(latestRate);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch rates' }, { status: 500 });
    }
}
