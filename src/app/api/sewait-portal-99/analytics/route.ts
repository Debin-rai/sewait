import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin } from '@/lib/auth';
import crypto from 'crypto';

const ADMIN_IP = "27.34.111.188";

export async function GET() {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // Normalize date for today (DAU)
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setUTCDate(today.getUTCDate() - 1);

        // Fetch daily hits (time series)
        const daily = await prisma.dailyAnalytic.findMany({
            orderBy: { date: 'desc' },
            take: 30
        });

        // Fetch top pages hits
        const visitors = await prisma.visitorAnalytic.findMany({
            orderBy: { hits: 'desc' },
            take: 10
        });

        // Calculate real DAU (Unique visitors today)
        const dau = await prisma.pageAnalytic.count({
            where: {
                date: today
            }
        });

        // Get yesterday's DAU for trend calculation
        const yesterdayDau = await prisma.pageAnalytic.count({
            where: {
                date: yesterday
            }
        });

        // Calculate trend (%)
        const hitsTrend = yesterdayDau === 0 ? 100 : Math.round(((dau - yesterdayDau) / yesterdayDau) * 100);

        // Get total unique visitors (lifetime)
        const totalUniques = await prisma.pageAnalytic.count();

        // Article count (Guides + Events)
        const [guidesCount, eventsCount] = await Promise.all([
            prisma.guide.count({ where: { status: 'PUBLISHED' } }),
            prisma.calendarEvent.count()
        ]);
        const articleCount = guidesCount + eventsCount;

        // Fetch recent audit logs
        const recentLogs = await prisma.auditLog.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                admin: {
                    select: {
                        name: true,
                        role: true
                    }
                }
            }
        });

        return NextResponse.json({
            daily,
            visitors,
            dau,
            totalUniques,
            hitsTrend,
            articleCount,
            recentLogs
        });
    } catch (error) {
        console.error("Fetch analytics error:", error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { path, device } = body;

        if (!path) return NextResponse.json({ error: 'Path required' }, { status: 400 });

        // Get Client IP
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

        // 1. Filter Admin IP
        if (clientIp === ADMIN_IP) {
            return NextResponse.json({ success: true, message: 'Admin visit ignored' });
        }

        // Normalize date to midnight UTC
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);

        // Generate Anonymized Visitor Hash (IP + Date)
        const visitorHash = crypto
            .createHash('md5')
            .update(`${clientIp}-${date.toISOString()}`)
            .digest('hex');

        // 2. Track Unique Daily Active User (DAU) - Unique per (path, visitorHash, date)
        await prisma.pageAnalytic.upsert({
            where: {
                pageUrl_visitorHash_date: {
                    pageUrl: path,
                    visitorHash: visitorHash,
                    date: date
                }
            },
            update: {}, // Do nothing if already exists for today
            create: {
                pageUrl: path,
                visitorHash: visitorHash,
                date: date,
                country: request.headers.get('x-vercel-ip-country') || 'Unknown'
            }
        });

        // 3. Update Legacy/Chart Metrics (Total Hits)
        await prisma.dailyAnalytic.upsert({
            where: {
                path_date: {
                    path,
                    date
                }
            },
            update: { hits: { increment: 1 } },
            create: { path, date, hits: 1 }
        });

        await prisma.visitorAnalytic.upsert({
            where: { id: path },
            update: {
                hits: { increment: 1 },
                device: device || 'desktop',
                updatedAt: new Date()
            },
            create: {
                id: path,
                path,
                device: device || 'desktop',
                hits: 1
            }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Analytics recorded error:", error);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
