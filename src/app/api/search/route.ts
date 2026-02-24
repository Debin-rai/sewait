import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q')?.toLowerCase() || '';

        if (!query || query.length < 1) {
            return NextResponse.json([]);
        }

        // 1. Static Feature Results
        const staticFeatures = [
            {
                id: 'feat-sewa-ai',
                title: 'Sewa AI Assistant',
                description: 'Ask anything about Nepal - government guides, documents, and news.',
                url: '/sewa-ai',
                category: 'Feature',
                icon: 'auto_awesome'
            },
            {
                id: 'feat-calendar',
                title: 'Nepali Calendar 2082',
                description: 'Check today&apos;s date, tithi, and festivals.',
                url: '/calendar',
                category: 'Feature',
                icon: 'calendar_month'
            },
            {
                id: 'feat-weather',
                title: 'Local Weather',
                description: 'Accurate weather forecasts for Nepali cities.',
                url: '/weather',
                category: 'Feature',
                icon: 'cloud'
            },
            {
                id: 'feat-debin',
                title: 'Debin C. Rai (Founder)',
                description: 'Learn about the founder and developer of SewaIT.',
                url: '/about',
                category: 'Founder',
                icon: 'person'
            }
        ].filter(f =>
            f.title.toLowerCase().includes(query) ||
            f.description.toLowerCase().includes(query)
        );

        // 2. Database Guide Results
        const dbGuides = await prisma.guide.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: 'insensitive' } },
                    { category: { contains: query, mode: 'insensitive' } }
                ],
                status: 'PUBLISHED'
            },
            take: 5,
            select: {
                id: true,
                title: true,
                slug: true,
                category: true,
                icon: true
            }
        });

        const guideResults = dbGuides.map(g => ({
            id: g.id,
            title: g.title,
            description: `Official Guide for ${g.category}`,
            url: `/guides/${g.slug}`,
            category: 'Guide',
            icon: g.icon || 'description'
        }));

        // Combine and return
        const allResults = [...staticFeatures, ...guideResults].slice(0, 8);
        return NextResponse.json(allResults);

    } catch (error) {
        console.error('Search API error:', error);
        return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }
}
