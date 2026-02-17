import { Metadata } from "next";
import NepseClient from "./NepseClient";

export const metadata: Metadata = {
    title: "NEPSE Live Market | Share Market Nepal | Stock Prices | SewaIT",
    description: "Track NEPSE live market, top gainers, losers, and share market updates in Nepal. Real-time stock prices and analysis on SewaIT.",
    keywords: ["NEPSE", "Share Market New", "Stock Exchange Nepal", "Share Price Today", "NEPSE Updates"],
};

export default function NepsePage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        'name': 'NEPSE Market Data',
        'description': 'Live share market data from Nepal Stock Exchange.',
        'provider': {
            '@type': 'Organization',
            'name': 'SewaIT'
        },
        'areaServed': 'Nepal'
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <NepseClient />
        </>
    );
}
