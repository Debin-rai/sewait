import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const sessions = await prisma.chatSession.findMany({
            where: { status: 'ACTIVE' },
            include: {
                _count: {
                    select: { messages: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Add some basic stats
        const totalSessions = await prisma.chatSession.count();
        const messagesToday = await prisma.chatMessage.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0))
                }
            }
        });

        return NextResponse.json({
            sessions: sessions.map(s => ({
                id: s.id,
                title: s.title || 'Untitled Session',
                visitorHash: s.visitorHash,
                messageCount: s._count.messages,
                createdAt: s.createdAt,
            })),
            stats: {
                totalSessions,
                messagesToday
            }
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { sessionId, deleteAll } = await req.json();

        if (deleteAll) {
            await prisma.chatSession.deleteMany({});
            return NextResponse.json({ success: true });
        }

        if (sessionId) {
            await prisma.chatSession.delete({
                where: { id: sessionId }
            });
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
