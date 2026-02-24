import { Metadata } from "next";
import WeatherClient from "./WeatherClient";

export const metadata: Metadata = {
    title: "Nepal Weather Forecast | Live Kathmandu Weather & Updates | SewaIT",
    description: "Get real-time weather updates for Kathmandu and all over Nepal. Accurate forecast, temperature, humidity, wind conditions, and sunrise/sunset times.",
    keywords: ["Nepal Weather Forecast", "Kathmandu Weather Today", "Mausam Nepal", "Weather Updates Kathmandu", "आजको मौसम", "SewaIT Weather"],
    openGraph: {
        title: "Nepal Weather Forecast | SewaIT",
        description: "Real-time weather updates and accurate forecasts for all of Nepal.",
        images: ["/web-app-manifest-512x512.png"]
    }
};

export default function WeatherPage() {
    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'Place',
            'name': 'Nepal',
            'description': 'Accurate weather forecasting and live weather reporting for major cities in Nepal including Kathmandu, Pokhara, and Biratnagar.',
            'address': {
                '@type': 'PostalAddress',
                'addressCountry': 'NP'
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
                    'name': 'Weather',
                    'item': 'https://sewait.up.railway.app/weather'
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
            <WeatherClient />
        </>
    );
}
