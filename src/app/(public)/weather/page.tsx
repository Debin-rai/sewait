import { Metadata } from "next";
import WeatherClient from "./WeatherClient";

export const metadata: Metadata = {
    title: "Nepal Weather Forecast | Live Kathmandu Weather & Updates | SewaIT",
    description: "Get real-time weather updates for Kathmandu and all over Nepal. accurate 7-day forecast, temperature, humidity, wind conditions, and sunrise/sunset times.",
    keywords: ["Nepal Weather Forecast", "Kathmandu Weather Today", "Mausam Nepal", "Weather Updates Kathmandu", "आजको मौसम", "SewaIT Weather"],
};

export default function WeatherPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        'name': 'Nepal',
        'description': 'Accurate weather forecasting and live weather reporting for major cities in Nepal including Kathmandu, Pokhara, and Biratnagar.',
        'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'NP'
        },
        'containsPlace': [
            {
                '@type': 'Place',
                'name': 'Kathmandu'
            },
            {
                '@type': 'Place',
                'name': 'Pokhara'
            }
        ]
    };

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
