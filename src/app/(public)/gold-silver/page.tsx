import { Metadata } from "next";
import GoldSilverClient from "./GoldSilverClient";

export const metadata: Metadata = {
    title: "Gold & Silver Price Today Nepal | सुन चाँदी मूल्य | SewaIT",
    description: "Live Gold and Silver rates in Nepal today. Track 24K/22K Gold price per Tola, Silver rates, and historical trends on SewaIT.",
    keywords: ["Gold Price Nepal", "Silver Price Nepal", "सुन चाँदी मूल्य", "Today Gold Rate", "1 Tola Gold Price"],
};

export default function GoldSilverPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        'name': 'Gold (24K) - 1 Tola',
        'image': 'https://sewait.com.np/assets/images/gold-coin.png',
        'description': 'Current market price of 24 Karat Gold in Nepal per Tola.',
        'brand': {
            '@type': 'Brand',
            'name': 'FENEGOSIDA'
        },
        'offers': {
            '@type': 'Offer',
            'url': 'https://sewait.com.np/gold-silver',
            'priceCurrency': 'NPR',
            'price': '118500',
            'priceValidUntil': new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0],
            'availability': 'https://schema.org/InStock',
            'itemCondition': 'https://schema.org/NewCondition'
        }
    };

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
