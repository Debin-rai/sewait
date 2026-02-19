import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { verifyAdmin, getSession } from '@/lib/auth';
import crypto from 'crypto';
import { startOfDay, subDays, format } from 'date-fns';

const ADMIN_IP = "27.34.111.188";

export async function GET(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || 'week'; // week, month, year

    try {
        // Normalize date for today
        const todayAtMidnight = startOfDay(new Date());

        let daysToFetch = 7;
        let dateFormat = 'EEE'; // Mon, Tue...
        if (period === 'month') {
            daysToFetch = 30;
            dateFormat = 'MMM d';
        } else if (period === 'year') {
            daysToFetch = 365;
            dateFormat = 'MMM';
        }

        const startDate = subDays(todayAtMidnight, daysToFetch - 1);

        // Fetch daily analytics for the period
        const dailyStats = await prisma.dailyAnalytic.groupBy({
            by: ['date'],
            _sum: { hits: true },
            where: {
                date: { gte: startDate }
            },
            orderBy: { date: 'asc' }
        });

        // Fetch unique page analytics for the period (uniques per page)
        const uniqueStats = await prisma.pageAnalytic.groupBy({
            by: ['date'],
            _count: { _all: true },
            where: {
                date: { gte: startDate }
            },
            orderBy: { date: 'asc' }
        });

        // Fetch guide creation stats for the period
        const contentStats = await prisma.guide.groupBy({
            by: ['createdAt'],
            _count: { _all: true },
            where: {
                createdAt: { gte: startDate }
            },
            orderBy: { createdAt: 'asc' }
        });

        // Generate full date range to ensure no gaps in the chart
        const chartData = [];
        for (let i = 0; i < daysToFetch; i++) {
            const date = subDays(todayAtMidnight, (daysToFetch - 1) - i);
            const dateStr = date.toISOString().split('T')[0];

            // Match daily stats (Hits)
            const dailyMatch = dailyStats.find(s => s.date.toISOString().split('T')[0] === dateStr);
            const hits = dailyMatch?._sum.hits || 0;

            // Match unique stats (DAU)
            const uniqueMatch = uniqueStats.find(s => s.date.toISOString().split('T')[0] === dateStr);
            const dauCount = uniqueMatch?._count._all || 0;

            // Match content stats (Guides created)
            const contentMatch = contentStats.filter(s => s.createdAt.toISOString().split('T')[0] === dateStr);
            const contentCount = contentMatch.reduce((acc, curr) => acc + curr._count._all, 0);

            chartData.push({
                date: dateStr,
                label: format(date, dateFormat),
                fullDate: format(date, 'PPP'), // e.g., April 29th, 2024
                day: format(date, 'EEE'), // Sun, Mon...
                hits,
                dau: dauCount,
                content: contentCount
            });
        }

        // Aggregate by month if period is year
        let finalChart = chartData;
        if (period === 'year') {
            const months: Record<string, any> = {};
            chartData.forEach(d => {
                const monthLabel = format(new Date(d.date), 'MMM');
                if (!months[monthLabel]) {
                    months[monthLabel] = { label: monthLabel, hits: 0, dau: 0 };
                }
                months[monthLabel].hits += d.hits;
                months[monthLabel].dau += d.dau;
            });
            finalChart = Object.values(months);
        }
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
        const uniqueVisitorsCount = await prisma.pageAnalytic.groupBy({
            by: ['visitorHash'],
        });
        const repeatCount = totalVisits - uniqueVisitorsCount.length;
        const userRetention = totalVisits > 0 ? Math.round((repeatCount / totalVisits) * 100) + '%' : '0%';

        // Calculate Period Totals
        const periodHits = chartData.reduce((acc, curr) => acc + curr.hits, 0);

        // Accurate unique visitors for the period
        const periodUniques = await prisma.pageAnalytic.groupBy({
            by: ['visitorHash'],
            where: {
                date: { gte: startDate }
            }
        });

        // Calculate real DAU (Unique visitors today)
        const dau = chartData[chartData.length - 1]?.dau || 0;

        // Get yesterday's DAU for trend calculation
        const yesterdayDau = chartData[chartData.length - 2]?.dau || 0;

        // Calculate trend (%)
        const hitsTrend = yesterdayDau === 0 ? (dau === 0 ? 0 : 100) : Math.round(((dau - yesterdayDau) / yesterdayDau) * 100);

        // Get total unique visitors (lifetime)
        const lifetimeUniques = await prisma.pageAnalytic.count(); // Approximate or raw count

        return NextResponse.json({
            dau,
            totalUniques: lifetimeUniques,
            periodUniques: periodUniques.length,
            periodHits,
            hitsTrend,
            articleCount: await prisma.guide.count(),
            devices,
            locations,
            userRetention,
            avgSessionDuration: '3m 45s',
            chart: finalChart
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
