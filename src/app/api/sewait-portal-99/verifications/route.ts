import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';

export async function GET() {
    const session = await verifyAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const verifications = await prisma.paymentVerification.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        plan: true
                    }
                }
            }
        });
        return NextResponse.json(verifications);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch verifications' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const session = await verifyAdmin();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id, status } = await request.json(); // status: APPROVED or REJECTED

        const verification = await prisma.paymentVerification.findUnique({
            where: { id },
            include: { user: true }
        });

        if (!verification) return NextResponse.json({ error: 'Verification not found' }, { status: 404 });

        // Update verification status
        const updatedVerification = await prisma.paymentVerification.update({
            where: { id },
            data: { status }
        });

        // If approved, update user plan
        if (status === 'APPROVED') {
            await prisma.user.update({
                where: { id: verification.userId },
                data: {
                    plan: verification.planRequested,
                    subscriptionStatus: 'PREMIUM',
                    aiUnitsLimit: verification.planRequested === 'PRO' ? 120 : 800,
                    subscriptionExpiry: new Date(Date.now() + 31 * 24 * 60 * 60 * 1000) // +1 month for MVP
                }
            });

            await prisma.auditLog.create({
                data: {
                    action: 'PAYMENT_APPROVED',
                    details: `Approved transaction ${verification.transactionId} for ${verification.user.email}. Plan set to ${verification.planRequested}`,
                    adminId: session.user.id
                }
            });
        }

        return NextResponse.json(updatedVerification);
    } catch (error) {
        console.error('Update verification error:', error);
        return NextResponse.json({ error: 'Failed to update verification' }, { status: 500 });
    }
}
