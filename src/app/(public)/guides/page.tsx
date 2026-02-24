import { Metadata } from "next";
import GuidesClient from "./GuidesClient";

export const metadata: Metadata = {
    title: "Sarkari Guides Nepal | Citizenship, Passport, & License Info | SewaIT",
    description: "Step-by-step simplified guides for Nepal government services: Citizenship, Passport (E-Passport), Driving License, PAN Card, and more. Navigate official processes easily with SewaIT.",
    keywords: ["Sarkari Guides", "Nepali Citizenship Guide", "Passport Nepal Renewal", "Driving License Nepal Process", "Sarkari Sewa", "Public Service Guides Nepal", "SewaIT Guides"],
    openGraph: {
        title: "Sarkari Guides - Nepal Government Services | SewaIT",
        description: "Official government service guides for citizens of Nepal. Simplified and step-by-step.",
        images: ["/web-app-manifest-512x512.png"]
    }
};

export default function GuidesPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        'name': 'Sarkari Guides - Nepal Government Services',
        'description': 'A comprehensive collection of simplified, step-by-step official government service guides for citizens of Nepal.',
        'breadcrumb': {
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
                    'name': 'Government Guides',
                    'item': 'https://sewait.up.railway.app/guides'
                }
            ]
        }
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
