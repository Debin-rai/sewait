import { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
    title: "Sarkari Guides Nepal | Official Citizenship, Passport, & License Info | SewaIT",
    description: "Step-by-step simplified guides for Nepal government services: Citizenship, Passport (E-Passport), Driving License, PAN Card, and more. Navigate official processes easily with SewaIT.",
    keywords: ["Sarkari Guides", "Nepali Citizenship Guide", "Passport Nepal Renewal", "Driving License Nepal Process", "Sarkari Sewa", "Public Service Guides Nepal", "SewaIT Guides"],
};

export default function GuidesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Sarkari Guides - Nepal Government Services',
        'description': 'A comprehensive collection of simplified, step-by-step official government service guides for citizens of Nepal.',
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
