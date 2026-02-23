"use client";

import React, { useEffect, useState } from "react";

export default function DocMarquee() {
    const [items, setItems] = useState<string[]>([]);
    const [speed, setSpeed] = useState(30); // pixels per second-ish
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarqueeData = async () => {
            try {
                const res = await fetch("/api/site-settings?keys=MARQUEE_ITEMS,MARQUEE_SPEED");
                const data = await res.json();

                const itemsStr = data.MARQUEE_ITEMS || "Nibedan (Letter),Character Certificate,Experience Letter,Job Application,Leave Application,Property Valuation";
                setItems(itemsStr.split(",").map((s: string) => s.trim()));

                const speedVal = parseInt(data.MARQUEE_SPEED) || 30;
                setSpeed(speedVal);
            } catch (err) {
                console.error("Failed to fetch marquee data", err);
                // Fallback
                setItems(["Nibedan (Letter)", "Character Certificate", "Experience Letter", "Job Application", "Leave Application", "Property Valuation"]);
            } finally {
                setLoading(false);
            }
        };

        fetchMarqueeData();
    }, []);

    if (loading || items.length === 0) return <div className="h-10"></div>;

    // Duplicate items to ensure smooth infinite loop
    const displayItems = [...items, ...items, ...items];

    return (
        <div className="relative w-full bg-black/10 backdrop-blur-sm border-y border-white/5 py-3 overflow-hidden">
            <div className="flex w-full overflow-hidden">
                <div
                    className="flex whitespace-nowrap animate-marquee gap-8 md:gap-16 items-center"
                    style={{ animationDuration: `${(displayItems.length * 200) / speed}s` }}
                >
                    {displayItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-amber-500 text-sm md:text-lg">verified</span>
                            <span className="text-white/80 text-[10px] md:text-sm font-black uppercase tracking-widest">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee linear infinite;
                }
            `}</style>
        </div>
    );
}
