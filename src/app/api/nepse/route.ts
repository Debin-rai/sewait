import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const latestData = await prisma.nepseData.findFirst({
            orderBy: {
                date: 'desc',
            },
        });

        if (!latestData) {
            return NextResponse.json({
                index: 2045.63,
                change: 9.20,
                percentChange: 0.45,
                status: "Closed",
                topGainers: [
                    { symbol: "NTC", change: 4.5 },
                    { symbol: "ADBL", change: 3.2 },
                    { symbol: "HDL", change: 2.8 }
                ]
            });
        }

        return NextResponse.json(latestData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch NEPSE data' }, { status: 500 });
    }
}
