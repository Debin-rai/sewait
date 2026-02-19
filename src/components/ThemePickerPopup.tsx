"use client";

import React, { useState, useEffect } from "react";
import { useHeroTheme, HeroTheme } from "@/context/ThemeContext";

const themeOptions: { value: HeroTheme; label: string; color: string; ring: string }[] = [
    { value: "blue", label: "Blue", color: "bg-[#274C77]", ring: "ring-[#274C77]" },
    { value: "red", label: "Red", color: "bg-[#b91c1c]", ring: "ring-[#b91c1c]" },
    { value: "pink", label: "Pink", color: "bg-[#be185d]", ring: "ring-[#be185d]" },
    { value: "green", label: "Green", color: "bg-[#15803d]", ring: "ring-[#15803d]" },
];

export default function ThemePickerPopup() {
    const { heroTheme, setHeroTheme } = useHeroTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [showGear, setShowGear] = useState(false);

    useEffect(() => {
        const dismissed = sessionStorage.getItem("sewait_theme_picker_dismissed");
        if (!dismissed) {
            const timer = setTimeout(() => setIsOpen(true), 1500);
            return () => clearTimeout(timer);
        } else {
            setShowGear(true);
        }
    }, []);

    const handleDismiss = () => {
        setIsOpen(false);
        setShowGear(true);
        sessionStorage.setItem("sewait_theme_picker_dismissed", "true");
    };

    const handleSelect = (theme: HeroTheme) => {
        setHeroTheme(theme);
    };

    return (
        <>
            {/* Floating gear button to re-open */}
            {showGear && !isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl rounded-l-xl p-2.5 hover:bg-slate-50 transition-all duration-300 group"
                    aria-label="Open theme picker"
                >
                    <span className="material-symbols-outlined text-slate-600 group-hover:text-primary transition-colors group-hover:rotate-90 duration-500 block text-xl">
                        settings
                    </span>
                </button>
            )}

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[95] theme-backdrop-enter"
                    onClick={handleDismiss}
                />
            )}

            {/* Side Panel */}
            <div
                className={`fixed top-0 right-0 h-full z-[96] flex items-center pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="pointer-events-auto bg-white/95 backdrop-blur-2xl border-l border-slate-200 shadow-2xl rounded-l-2xl p-6 w-[220px] md:w-[260px] mr-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-sm font-black text-slate-800 tracking-tight">Theme</h3>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Pick your vibe</p>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
                            aria-label="Close theme picker"
                        >
                            <span className="material-symbols-outlined text-slate-400 text-lg">close</span>
                        </button>
                    </div>

                    {/* Color Options */}
                    <div className="space-y-3">
                        {themeOptions.map((option) => (
                            <button
                                key={option.value}
                                onClick={() => handleSelect(option.value)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-300 group ${heroTheme === option.value
                                        ? "bg-slate-100 shadow-sm"
                                        : "hover:bg-slate-50"
                                    }`}
                            >
                                <div
                                    className={`w-8 h-8 rounded-full ${option.color} shadow-md transition-all duration-300 ${heroTheme === option.value
                                            ? `ring-2 ${option.ring} ring-offset-2 scale-110`
                                            : "group-hover:scale-110"
                                        }`}
                                />
                                <div className="flex-1 text-left">
                                    <span className={`text-sm font-bold transition-colors ${heroTheme === option.value ? "text-slate-900" : "text-slate-600"
                                        }`}>
                                        {option.label}
                                    </span>
                                    {option.value === "blue" && (
                                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider ml-1.5">Default</span>
                                    )}
                                </div>
                                {heroTheme === option.value && (
                                    <span className="material-symbols-outlined text-primary text-lg">check_circle</span>
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Info */}
                    <p className="text-[9px] text-slate-400 text-center mt-5 font-medium leading-relaxed">
                        Changes only the hero section.<br />Your choice is saved automatically.
                    </p>
                </div>
            </div>
        </>
    );
}
