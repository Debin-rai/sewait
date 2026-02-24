"use client";

import React, { useState } from "react";
import { useTheme, ThemeType } from "@/context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemePicker() {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const themeOptions: { id: ThemeType; color: string; label: string }[] = [
        { id: "default", color: "bg-[#1F3A5F]", label: "Default Blue" },
        { id: "red", color: "bg-[#7F1D1D]", label: "Premium Red" },
        { id: "green", color: "bg-[#064E3B]", label: "Emerald Green" },
        { id: "pink", color: "bg-[#701A75]", label: "Royal Pink" },
    ];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-50 border border-slate-100 text-slate-600 hover:text-primary transition-all group shadow-sm active:scale-95"
                title="Change Theme"
            >
                <span className={`material-symbols-outlined transition-transform duration-500 ${isOpen ? 'rotate-180 text-primary' : 'group-hover:rotate-45'}`}>
                    palette
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[1px] theme-backdrop-enter"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            className="absolute right-0 mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 p-2 overflow-hidden"
                        >
                            <div className="px-3 py-2 mb-1">
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Select Theme</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                {themeOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        onClick={() => {
                                            setTheme(opt.id);
                                            setIsOpen(false);
                                        }}
                                        className={`flex items-center gap-3 w-full p-2.5 rounded-xl transition-all ${theme === opt.id ? 'bg-primary/5 text-primary' : 'hover:bg-slate-50 text-slate-600'}`}
                                    >
                                        <div className={`w-4 h-4 rounded-full ${opt.color} shadow-sm border border-white/20`} />
                                        <span className="text-xs font-bold">{opt.label}</span>
                                        {theme === opt.id && (
                                            <span className="material-symbols-outlined text-sm ml-auto">check_circle</span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
