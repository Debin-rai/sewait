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
        <div className={`relative group overflow-hidden rounded-[2rem] border border-white/10 dark:border-white/5 shadow-2xl transition-all duration-500 hover:shadow-emerald-500/10 ${className}`}>
            <div className={`absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
            <img
                src={ad.imageUrl}
                alt={ad.name}
                className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ${aspectRatio === 'video' ? 'aspect-video' : ''}`}
            />
            <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-xl border border-white/10 px-2 py-1 rounded-lg text-[7px] font-black text-white/90 uppercase tracking-[0.2em] z-20 pointer-events-none shadow-xl">
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
