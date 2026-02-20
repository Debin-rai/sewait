import type { Metadata } from "next";
import SewaAIClient from "./SewaAIClient";

export const metadata: Metadata = {
    title: "Sewa AI - Your Nepali Assistant | SewaIT",
    description: "Ask Sewa AI anything about Nepal — gold rates, weather, calendar, government services, and more. Powered by AI.",
    keywords: ["sewa ai", "nepal ai assistant", "nepali chatbot", "sewait ai", "nepal help"],
    openGraph: {
        title: "Sewa AI - Your Nepali Assistant",
        description: "AI-powered assistant for everything Nepal. Ask about gold rates, weather, festivals, government services and more.",
    }
};

export default function SewaAIPage() {
    return <SewaAIClient />;
}
