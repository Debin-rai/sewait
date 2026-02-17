import { Metadata } from "next";
import WeatherClient from "./WeatherClient";

export const metadata: Metadata = {
    title: "Nepal Weather Forecast | Live Kathmandu Weather | SewaIT",
    description: "Get real-time weather updates for Kathmandu and all over Nepal. 7-day forecast, temperature, humidity, and sunrise/sunset times.",
    keywords: ["Nepal Weather", "Kathmandu Weather", "Mausam", "Weather Forecast Nepal", "आजको मौसम"],
};

export default function WeatherPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Place',
        'name': 'Nepal',
        'address': {
            '@type': 'PostalAddress',
            'addressCountry': 'NP'
        },
        'containsPlace': {
            '@type': 'Place',
            'name': 'Kathmandu'
        }
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
