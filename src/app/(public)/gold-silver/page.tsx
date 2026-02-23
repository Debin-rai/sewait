import { Metadata } from "next";
import GoldSilverClient from "./GoldSilverClient";

export const metadata: Metadata = {
    title: "Gold & Silver Price Today in Nepal (सुन चाँदी मूल्य) | SewaIT",
    description: "Live Gold and Silver rates in Nepal today. Track 24K and 22K Gold price per Tola, Silver rates, and historical price trends updated daily on SewaIT.",
    keywords: ["Gold Price Nepal Today", "Silver Price Nepal", "सुन चाँदीको ताजा मूल्य", "Today Gold Rate", "1 Tola Gold Price in Nepal", "SewaIT Gold"],
};

export default function GoldSilverPage() {
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            'name': 'Gold & Silver Rates Nepal - SewaIT',
            'operatingSystem': 'Any',
            'applicationCategory': 'FinanceApplication',
            'description': 'Live daily price of Gold (24K, 22K) and Silver in Nepal with interactive charts and historical data.',
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
                    'name': 'Gold & Silver Rates',
                    'item': 'https://sewait.up.railway.app/gold-silver'
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
            <GoldSilverClient />
        </>
    );
}
