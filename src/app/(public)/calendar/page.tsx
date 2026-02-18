import { Metadata } from "next";
import CalendarClient from "./CalendarClient";

export const metadata: Metadata = {
    title: "नेपाली पात्रो २०८१ | चाडपर्व र तिथि | SewaIT",
    description: "आजको नेपाली मिति, तिथि, र दशैं तिहार जस्ता आउँदै गरेका चाडपर्वहरू हेर्नुहोस्। SewaIT को सही नेपाली पात्रो २०८०-२०८१।",
    keywords: ["Nepali Calendar 2081", "आजको मिती", "Today Nepali Date", "Tithi Today", "Nepali Festivals", "नेपाली पात्रो"],
};

export default function CalendarPage() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Event',
        'name': 'Today in Nepali Calendar',
        'startDate': new Date().toISOString().split('T')[0],
        'eventStatus': 'https://schema.org/EventScheduled',
        'eventAttendanceMode': 'https://schema.org/OnlineEventAttendanceMode',
        'location': {
            '@type': 'VirtualLocation',
            'url': 'https://sewait.up.railway.app/calendar'
        },
        'description': 'Daily Panchang, Tithi, and Auspicious timestamps for today.',
        'organizer': {
            '@type': 'Organization',
            'name': 'SewaIT',
            'url': 'https://sewait.up.railway.app'
        }
    };

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
