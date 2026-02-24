import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const users = await prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                status: true,
                plan: true,
                subscriptionStatus: true,
                aiUnitsUsedThisMonth: true,
                aiUnitsLimit: true,
                lastLogin: true,
                createdAt: true,
            }
        });

        return NextResponse.json(users);
    } catch (error) {
        console.error('Fetch users error:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { userId, plan, status, aiUnitsLimit } = await request.json();

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                plan: plan || undefined,
                status: status || undefined,
                aiUnitsLimit: aiUnitsLimit !== undefined ? Number(aiUnitsLimit) : undefined,
                subscriptionStatus: plan === 'PRO' || plan === 'BUSINESS' ? 'PREMIUM' : 'FREE',
            }
        });

        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error('Update user error:', error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}
