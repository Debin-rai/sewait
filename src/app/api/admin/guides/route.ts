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
        const { title, slug, category, content } = body;

        // --- Audit Log ---
        console.log(`[AUDIT] Admin (${session.user?.email}) created GUIDE: ${title}`);

        const guide = await prisma.guide.create({
            data: {
                title,
                slug,
                category,
                content,
            },
        });

        return NextResponse.json(guide);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create guide' }, { status: 500 });
    }
}

export async function GET() {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const guides = await prisma.guide.findMany({
            orderBy: { updatedAt: 'desc' }
        });
        return NextResponse.json(guides);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch guides' }, { status: 500 });
    }
}
