"use client";

import { useState, useEffect } from "react";

interface Ad {
    id: string;
    name: string;
    imageUrl: string;
    link: string | null;
    position: string;
}

interface AdSlotProps {
    position: string;
    className?: string;
    aspectRatio?: string; // e.g., "video", "square", "auto"
}

export default function AdSlot({ position, className = "", aspectRatio = "auto" }: AdSlotProps) {
    const [ad, setAd] = useState<Ad | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAd = async () => {
            try {
                const res = await fetch(`/api/ads?position=${position}`);
                const data = await res.json();
                if (Array.isArray(data) && data.length > 0) {
                    // Pick a random ad if multiple are active for the same slot
                    const randomIndex = Math.floor(Math.random() * data.length);
                    const selectedAd = data[randomIndex];
                    setAd(selectedAd);

                    // Track impression in cookie
                    const { trackAdImpression } = await import("@/lib/cookies");
                    trackAdImpression(selectedAd.id);
                }
            } catch (error) {
                console.error("Ad fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAd();
    }, [position]);

    const handleAdClick = async () => {
        if (!ad) return;
        try {
            await fetch("/api/ads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ adId: ad.id }),
            });
        } catch (error) {
            console.error("Click tracking failed", error);
        }
    };

    if (loading) return null; // Or a subtle skeleton
    if (!ad) return null;

    const content = (
        <div className={`relative group overflow-hidden rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm transition-all hover:shadow-md ${className}`}>
            <img
                src={ad.imageUrl}
                alt={ad.name}
                className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${aspectRatio === 'video' ? 'aspect-video' : ''}`}
            />
            <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-md px-1.5 py-0.5 rounded text-[8px] font-black text-white/80 uppercase tracking-widest z-10 pointer-events-none">
                Sponsored
            </div>
        </div>
    );

    if (ad.link) {
        return (
            <a
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleAdClick}
                className="block"
            >
                {content}
            </a>
        );
    }

    return content;
}
