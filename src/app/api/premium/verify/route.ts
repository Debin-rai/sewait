import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
        }

        const { transactionId, planRequested } = await req.json();

        if (!transactionId || !planRequested) {
            return NextResponse.json({ error: 'Transaction ID and Plan are required' }, { status: 400 });
        }

        // Create verification request
        const verification = await prisma.paymentVerification.create({
            data: {
                userId: session.user.id,
                transactionId,
                planRequested,
                status: 'PENDING'
            }
        });

        // Audit Log
        await prisma.auditLog.create({
            data: {
                action: 'PAYMENT_SUBMITTED',
                details: `User ${session.user.email} submitted Transaction ID: ${transactionId} for ${planRequested}`,
                adminId: session.user.id
            }
        });

        return NextResponse.json({ success: true, id: verification.id });
    } catch (error: any) {
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'This transaction ID has already been submitted.' }, { status: 400 });
        }
        console.error('Premium verify error:', error);
        return NextResponse.json({ error: 'Failed to submit verification' }, { status: 500 });
    }
}
