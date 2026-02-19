import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
    try {
        const ads = await prisma.advertisement.findMany({
            orderBy: { createdAt: 'desc' },
        });
        return NextResponse.json(ads);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch ads' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { name, client, position, imageUrl, link, startDate, endDate, status } = body;

        // --- Audit Log ---
        await prisma.systemLog.create({
            data: {
                action: 'CREATE_AD',
                admin: session.user?.email || 'unknown',
                details: `Created ad: ${name} (${position})`,
            }
        });

        const ad = await prisma.advertisement.create({
            data: {
                name,
                client,
                position,
                imageUrl,
                link,
                startDate: (startDate && startDate.trim() !== "") ? new Date(startDate) : null,
                endDate: (endDate && endDate.trim() !== "") ? new Date(endDate) : null,
                status: status || "ACTIVE",
            },
        });

        return NextResponse.json(ad);
    } catch (error) {
        console.error("Ad creation error:", error);
        return NextResponse.json({ error: 'Failed to create ad' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, ...data } = body;

        await prisma.systemLog.create({
            data: {
                action: 'UPDATE_AD',
                admin: session.user?.email || 'unknown',
                details: `Updated ad ID: ${id}`,
            }
        });

        // Convert dates if present
        if (data.startDate) data.startDate = new Date(data.startDate);
        if (data.endDate) data.endDate = new Date(data.endDate);

        const ad = await prisma.advertisement.update({
            where: { id },
            data,
        });

        return NextResponse.json(ad);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update ad' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

        await prisma.systemLog.create({
            data: {
                action: 'DELETE_AD',
                admin: session.user?.email || 'unknown',
                details: `Deleted ad ID: ${id}`,
            }
        });

        await prisma.advertisement.delete({
            where: { id },
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete ad' }, { status: 500 });
    }
}
