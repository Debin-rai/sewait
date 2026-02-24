"use client";

import React, { useEffect, useState, useRef } from "react";
import { getCurrentNepaliDate } from "@/lib/nepaliDate";
import FadeIn from "@/components/animations/FadeIn";
import DocMarquee from "./DocMarquee";
import { useTheme, THEMES } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";

export default function Hero() {
    const { theme } = useTheme();
    const router = useRouter();
    const [nepaliDate, setNepaliDate] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    // Animation state for sliding background
    const [prevTheme, setPrevTheme] = useState(theme);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setNepaliDate(getCurrentNepaliDate());
        const timer = setInterval(() => setNepaliDate(getCurrentNepaliDate()), 60000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (mounted && theme !== prevTheme) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setPrevTheme(theme);
                setIsAnimating(false);
            }, 600); // Matches CSS animation duration
            return () => clearTimeout(timer);
        }
    }, [theme, prevTheme, mounted]);

    return (
        <section className="relative overflow-hidden">
            {/* Current Background Layer */}
            <div
                className="hero-theme-layer"
                style={{ background: THEMES[prevTheme].gradient }}
            />

            {/* Incoming Background Layer (Sliding) */}
            {isAnimating && (
                <div
                    className="hero-theme-layer hero-theme-incoming hero-slide-active"
                    style={{ background: THEMES[theme].gradient }}
                />
            )}

            {/* Dot pattern overlay */}
            <div className="hero-dot-pattern" />

            {/* Content */}
            <div className="relative z-10 text-white">
                <FadeIn delay={0.1} fullWidth>
                    <div className="container mx-auto px-4 lg:px-10 py-16 md:py-24 text-center relative z-10">
                        <div className="flex flex-col items-center gap-2 md:gap-3">
                            <div className="flex items-center gap-2 text-slate-300 mb-1 transition-colors duration-500">
                                <span className="material-symbols-outlined text-lg">calendar_today</span>
                                <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Nepali Samvat <span className="nepali-font">नेपाली सम्वत्</span></span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-2 md:mb-4">
                                {nepaliDate ? (
                                    <>
                                        <span className="nepali-font">{nepaliDate.year} {nepaliDate.month} </span>
                                        <span className="nepali-font text-white/90">{nepaliDate.day}, {nepaliDate.dayName}</span>
                                    </>
                                ) : (
                                    <span className="opacity-0">Loading...</span>
                                )}
                            </h2>
                            <p className="text-base md:text-lg text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
                                Create professional Government letters, Job applications, and formal documents instantly with <span className="text-white font-bold">Sarkari AI</span>.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mt-8 md:mt-10">
                                <button
                                    onClick={() => router.push('/sewa-ai')}
                                    className="bg-white px-8 md:px-10 py-3 md:py-4 rounded-2xl font-bold text-base md:text-lg shadow-2xl hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 group"
                                    style={{ color: THEMES[theme].primary }}
                                >
                                    <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">auto_fix_high</span>
                                    Sarkari AI Assistant
                                </button>
                                <div className="px-5 md:px-6 py-2 md:py-3 bg-white/10 border border-white/20 rounded-2xl text-[11px] md:text-xs font-black uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                                    Rs. 400 / Month Premium
                                </div>
                            </div>
                        </div>
                    </div>
                </FadeIn>
                {/* Marquee Section */}
                <div className="mt-12 md:mt-20">
                    <DocMarquee />
                </div>
            </div>
        </section>
    );
}
