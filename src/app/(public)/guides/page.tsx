import { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
    title: "Sarkari Guides Nepal | Official Citizenship, Passport, License Info | SewaIT",
    description: "Step-by-step guides for Nepal government services: Citizenship, Passport, Driving License, PAN Card, and more. Simplified for everyone.",
    keywords: ["Sarkari Guides", "Nepali Citizenship", "Passport Nepal", "Driving License Nepal", "Sarkari Sewa", "Public Service Guides"],
};

export default function GuidesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Sarkari Guides',
        'description': 'Collection of official government service guides for Nepal.',
        'hasPart': [
            {
                '@type': 'HowTo',
                'name': 'E-Passport Renewal',
                'description': 'How to renew your electronic passport in Nepal.'
            },
            {
                '@type': 'HowTo',
                'name': 'Medical License',
                'description': 'Process to obtain medical license from Nepal Medical Council.'
            },
            {
                '@type': 'HowTo',
                'name': 'Company Registration',
                'description': 'Step by step guide to register a new company in Nepal.'
            }
        ]
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <GuidesClient />
        </>
    );
}
