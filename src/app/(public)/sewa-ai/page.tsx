import type { Metadata } from "next";

import SewaAIClient from "./SewaAIClient";

export const metadata: Metadata = {
    title: "Sewa AI - Your Nepali Assistant | SewaIT",
    description: "Ask Sewa AI anything about Nepal — weather, calendar, government services, and more. Powered by AI.",
    keywords: ["sewa ai", "nepal ai assistant", "nepali chatbot", "sewait ai", "nepal help"],
    openGraph: {
        title: "Sewa AI - Your Nepali Assistant",
        description: "AI-powered assistant for everything Nepal. Ask about weather, festivals, government services and more.",
    }
};

export default function SewaAIPage() {
    return (
        <SewaAIClient />
    );
}
