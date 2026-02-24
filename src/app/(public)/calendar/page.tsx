import { Metadata } from "next";
import CalendarClient from "./CalendarClient";

export const metadata: Metadata = {
    title: "नेपाली पात्रो २०८२ | आजको मिति, तिथि र चाडपर्व | SewaIT",
    description: "आजको नेपाली मिति (BS), तिथि, र दशैं, तिहार जस्ता आउँदै गरेका महत्वपूर्ण चाडपर्वहरू हेर्नुहोस्। SewaIT को आधिकारिक र सही नेपाली पात्रो २०८१-२०८२।",
    keywords: ["Nepali Calendar 2082", "आजको मिती", "Today Nepali Date", "Tithi Today", "Nepali Festivals", "नेपाली पात्रो", "SewaIT Calendar"],
    openGraph: {
        title: "नेपाली पात्रो २०८२ | SewaIT",
        description: "आधिकारिक र सही नेपाली पात्रो। आजको मिति, तिथि र चाडपर्वहरू।",
        images: ["/web-app-manifest-512x512.png"]
    }
};

export default function CalendarPage() {
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'Nepali Calendar 2082 - SewaIT',
            'operatingSystem': 'Any',
            'applicationCategory': 'UtilityApplication',
            'description': 'Live Nepali Calendar (Bikram Sambat) with Tithi, government holidays, festivals, and today\'s date in BS and AD.',
            'creator': {
                '@type': 'Organization',
                'name': 'SewaIT'
            },
            'offers': {
                '@type': 'Offer',
                'price': '0',
                'priceCurrency': 'NPR'
            }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            'itemListElement': [
                {
                    '@type': 'ListItem',
                    'position': 1,
                    'name': 'Home',
                    'item': 'https://sewait.up.railway.app'
                },
                {
                    '@type': 'ListItem',
                    'position': 2,
                    'name': 'Nepali Calendar',
                    'item': 'https://sewait.up.railway.app/calendar'
                }
            ]
        }
    ];

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <CalendarClient />
        </>
    );
}
