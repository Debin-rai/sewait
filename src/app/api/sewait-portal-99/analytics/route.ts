import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin, getSession } from '@/lib/auth';
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

        // --- NEW: Real Aggregates for Devices & Locations ---

        // 1. Device Distribution
        const deviceStats = await prisma.visitorAnalytic.groupBy({
            by: ['device'],
            _sum: { hits: true }
        });
        const totalDeviceHits = deviceStats.reduce((acc, curr) => acc + (curr._sum.hits || 0), 0);
        const devices = deviceStats.map(d => ({
            name: d.device || 'Unknown',
            percentage: totalDeviceHits > 0 ? Math.round(((d._sum.hits || 0) / totalDeviceHits) * 100) : 0,
            icon: d.device === 'mobile' ? 'smartphone' : 'desktop_windows'
        }));

        // 2. Geographic Distribution
        const locationStats = await prisma.pageAnalytic.groupBy({
            by: ['country'],
            _count: { _all: true },
            orderBy: { _count: { country: 'desc' } },
            take: 5
        });
        const locations = locationStats.map(l => ({
            city: l.country || 'Unknown', // Using country as city for now as DB schema uses country
            sessions: l._count._all.toLocaleString(),
            trend: '+0%' // Trend would require comparing with previous period
        }));

        // 3. User Retention (Simple repeat visitor calculation)
        const totalVisits = await prisma.pageAnalytic.count();
        const uniqueVisitors = await prisma.pageAnalytic.groupBy({
            by: ['visitorHash'],
        });
        const repeatCount = totalVisits - uniqueVisitors.length;
        const userRetention = totalVisits > 0 ? Math.round((repeatCount / totalVisits) * 100) + '%' : '0%';

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

        return NextResponse.json({
            daily,
            visitors,
            dau,
            totalUniques,
            hitsTrend,
            devices,
            locations,
            userRetention,
            avgSessionDuration: '3m 45s' // Mock for now as session end tracking is not implemented
        });
    } catch (error) {
        console.error("Fetch analytics error:", error);
        return NextResponse.json({ error: 'Failed to fetch analytics' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { path, device, visitorId } = body;

        if (!path) return NextResponse.json({ error: 'Path required' }, { status: 400 });

        // Get Client IP
        const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

        // 1. Filter Admin IP or Session or Exclusion Cookie
        const session = await getSession();
        const exclusionCookie = request.headers.get('cookie')?.includes('sewait_exclude_analytics=true');

        if (clientIp === ADMIN_IP || (session && session.user?.role === "ADMIN") || exclusionCookie) {
            return NextResponse.json({ success: true, message: 'Internal visit ignored' });
        }

        // Normalize date to midnight UTC
        const date = new Date();
        date.setUTCHours(0, 0, 0, 0);

        // Generate Anonymized Visitor Hash (Client ID or IP + Date)
        // If client provides a visitorId (cookie-based), use it. Otherwise fallback to IP-based.
        const finalVisitorHash = visitorId || crypto
            .createHash('md5')
            .update(`${clientIp}-${date.toISOString()}`)
            .digest('hex');

        // 2. Track Unique Daily Active User (DAU) - Unique per (path, visitorHash, date)
        await prisma.pageAnalytic.upsert({
            where: {
                pageUrl_visitorHash_date: {
                    pageUrl: path,
                    visitorHash: finalVisitorHash,
                    date: date
                }
            },
            update: {}, // Do nothing if already exists for today
            create: {
                pageUrl: path,
                visitorHash: finalVisitorHash,
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
