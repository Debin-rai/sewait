"use client";

import React, { useEffect, useState, useRef } from "react";
import { getCurrentNepaliDate } from "@/lib/nepaliDate";
import FadeIn from "@/components/animations/FadeIn";
import { useHeroTheme, HeroTheme } from "@/context/ThemeContext";

const themeConfig: Record<HeroTheme, {
    gradient: string;
    tickerBg: string;
    accentText: string;
    pillBg: string;
    pillBorder: string;
    bottomBorder: string;
}> = {
    blue: {
        gradient: "linear-gradient(135deg, #1F3A5F 0%, #274C77 100%)",
        tickerBg: "rgba(0,0,0,0.1)",
        accentText: "text-slate-300",
        pillBg: "bg-slate-100/10",
        pillBorder: "border-white/20",
        bottomBorder: "border-white/5",
    },
    red: {
        gradient: "radial-gradient(circle at center, #ef4444 0%, #b91c1c 100%)",
        tickerBg: "rgba(0,0,0,0.3)",
        accentText: "text-amber-300",
        pillBg: "bg-amber-400/15",
        pillBorder: "border-amber-300/30",
        bottomBorder: "border-white/10",
    },
    pink: {
        gradient: "linear-gradient(135deg, #ec4899 0%, #be185d 100%)",
        tickerBg: "rgba(0,0,0,0.15)",
        accentText: "text-pink-200",
        pillBg: "bg-white/10",
        pillBorder: "border-pink-300/30",
        bottomBorder: "border-white/10",
    },
    green: {
        gradient: "linear-gradient(135deg, #16a34a 0%, #15803d 100%)",
        tickerBg: "rgba(0,0,0,0.15)",
        accentText: "text-emerald-200",
        pillBg: "bg-emerald-100/10",
        pillBorder: "border-emerald-300/30",
        bottomBorder: "border-white/10",
    },
};

export default function Hero() {
    const { heroTheme } = useHeroTheme();
    const [goldRate, setGoldRate] = useState<any>(null);
    const [nepse, setNepse] = useState<any>(null);
    const [nextEvent, setNextEvent] = useState<any>(null);
    const [nepaliDate, setNepaliDate] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    // Slide transition state
    const [prevTheme, setPrevTheme] = useState<HeroTheme>(heroTheme);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (prevTheme !== heroTheme && mounted) {
            setIsTransitioning(true);
            if (transitionTimeoutRef.current) clearTimeout(transitionTimeoutRef.current);
            transitionTimeoutRef.current = setTimeout(() => {
                setPrevTheme(heroTheme);
                setIsTransitioning(false);
            }, 600);
        }
    }, [heroTheme, mounted, prevTheme]);

    useEffect(() => {
        setMounted(true);
        const fetchAllData = async () => {
            try {
                const [gRes, nRes, cRes] = await Promise.all([
                    fetch("/api/sewait-portal-99/rates/gold"),
                    fetch("/api/sewait-portal-99/rates/nepse"),
                    fetch("/api/sewait-portal-99/calendar?limit=1")
                ]);
                setGoldRate(await gRes.json());
                setNepse(await nRes.json());
                const calendarData = await cRes.json();
                if (Array.isArray(calendarData) && calendarData.length > 0) {
                    const dayWithEvent = calendarData.find((d: any) => d.events && d.events.length > 0);
                    if (dayWithEvent) setNextEvent({ ...dayWithEvent.events[0], bsDate: dayWithEvent.bsDate });
                }
            } catch (err) {
                console.error("Failed to fetch data for Hero", err);
            }
        };

        fetchAllData();
        setNepaliDate(getCurrentNepaliDate());
        const timer = setInterval(() => setNepaliDate(getCurrentNepaliDate()), 60000);
        return () => clearInterval(timer);
    }, []);

    const config = themeConfig[heroTheme];
    const prevConfig = themeConfig[prevTheme];

    return (
        <section className="relative overflow-hidden">
            {/* Previous theme layer (base) */}
            <div
                className="hero-theme-layer"
                style={{ background: prevConfig.gradient }}
            />

            {/* New theme layer (slides in from right) */}
            <div
                className={`hero-theme-layer hero-theme-incoming ${isTransitioning ? "hero-slide-active" : (prevTheme === heroTheme ? "hero-slide-done" : "")}`}
                style={{ background: config.gradient }}
            />

            {/* Dot pattern overlay */}
            <div className="hero-dot-pattern" />

            {/* Content */}
            <div className="relative z-10 text-white">
                <FadeIn delay={0.1} fullWidth>
                    <div className="container mx-auto px-4 lg:px-10 py-10 md:py-16 text-center relative z-10">
                        <div className="flex flex-col items-center gap-2 md:gap-3">
                            <div className={`flex items-center gap-2 ${config.accentText} mb-1 transition-colors duration-500`}>
                                <span className="material-symbols-outlined text-lg">calendar_today</span>
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Nepali Samvat <span className="nepali-font">नेपाली सम्वत्</span></span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white mb-1 md:mb-2 transition-colors duration-500">
                                {nepaliDate ? (
                                    <>
                                        <span className="nepali-font">{nepaliDate.year} {nepaliDate.month} {nepaliDate.day},</span> <span className="text-white/90 nepali-font">{nepaliDate.dayName}</span>
                                    </>
                                ) : (
                                    <span className="opacity-0">Loading...</span>
                                )}
                            </h2>
                            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mt-2 md:mt-4">
                                <div className={`px-3 md:px-4 py-1 md:py-1.5 ${config.pillBg} border ${config.pillBorder} rounded text-xs md:text-sm font-semibold text-white/90 transition-all duration-500`}>
                                    Tithi <span className="nepali-font">तिथि</span>: <span className="font-bold">एकादशी</span>
                                </div>
                                <div className="h-4 w-px bg-white/20 hidden md:block"></div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs md:text-sm font-medium text-slate-300">
                                        Next Event:
                                        <span className="text-white font-bold ml-1">
                                            {nextEvent ? nextEvent.name : "Maha Shivaratri"}
                                            {nextEvent && <span className="text-white/60 text-[10px] ml-1">({nextEvent.bsDate})</span>}
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
                <FadeIn delay={0.2} direction="up" fullWidth>
                    <div
                        className="backdrop-blur-sm py-2 md:py-2.5 transition-all duration-500"
                        style={{ backgroundColor: config.tickerBg, borderTop: `1px solid rgba(255,255,255,0.05)` }}
                    >
                        <div className="container mx-auto px-4 lg:px-10 flex items-center justify-between gap-4 md:gap-6 text-white overflow-hidden">
                            <div className="flex items-center gap-3 md:gap-6 text-[10px] md:text-xs font-black uppercase tracking-widest text-white/80 shrink-0">
                                <div className="flex items-center gap-1.5 md:gap-2 pr-3 md:pr-6 border-r border-white/10">
                                    <span className="material-symbols-outlined text-white/60 text-sm md:text-lg">sunny</span>
                                    <span>22°C</span>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2 whitespace-nowrap">
                                    <span className="material-symbols-outlined text-white/60 text-sm md:text-lg">schedule</span>
                                    <span>{mounted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--"}</span>
                                </div>
                            </div>
                            <div className="flex-1 ticker-wrap text-[10px] md:text-xs font-black tracking-widest text-white/70 overflow-hidden">
                                <div className="ticker gap-12 whitespace-nowrap">
                                    {nepse && (
                                        <span className="flex items-center gap-2">
                                            NEPSE: <span className="text-white">{nepse.index?.toLocaleString()}</span>
                                            <span className={nepse.change >= 0 ? "text-green-400" : "text-red-400"}>
                                                {nepse.change >= 0 ? "▲" : "▼"} {Math.abs(nepse.change)} ({nepse.percentChange}%)
                                            </span>
                                        </span>
                                    )}
                                    {goldRate && (
                                        <span className="flex items-center gap-2">
                                            GOLD (24K): <span className="text-white">NPR {goldRate.gold24?.toLocaleString()}</span>
                                            <span className="text-slate-400">•</span>
                                            SILVER: <span className="text-white">NPR {goldRate.silver?.toLocaleString()}</span>
                                        </span>
                                    )}
                                    <span className="font-bold text-white uppercase bg-white/10 px-2 py-0.5 rounded">Real-Time Updates Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
