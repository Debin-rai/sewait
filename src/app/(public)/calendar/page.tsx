import { Metadata } from "next";
import CalendarClient from "./CalendarClient";

export const metadata: Metadata = {
    title: "Nepali Calendar 2081 | Upcoming Festivals & Tithi | SewaIT",
    description: "Check today's Nepali date, tithi, and upcoming festivals like Dashain and Tihar. SewaIT's accurate Nepali Calendar 2080-2081.",
    keywords: ["Nepali Calendar 2081", "आजको मिती", "Today Nepali Date", "Tithi Today", "Nepali Festivals"],
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
            'url': 'https://sewait.com.np/calendar'
        },
        'description': 'Daily Panchang, Tithi, and Auspicious timestamps for today.',
        'organizer': {
            '@type': 'Organization',
            'name': 'SewaIT',
            'url': 'https://sewait.com.np'
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
