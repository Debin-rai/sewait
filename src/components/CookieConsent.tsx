"use client";

import { useState, useEffect } from "react";
import { Cookie, X, ChevronRight, Check, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function CookieConsent() {
    const { theme } = useTheme();
    const [show, setShow] = useState(false);
    const [isManaging, setIsManaging] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("sewait_cookie_consent");
        if (!consent) {
            const timer = setTimeout(() => setShow(true), 2500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem("sewait_cookie_consent", "all");
        setShow(false);
    };

    const handleAcceptEssential = () => {
        localStorage.setItem("sewait_cookie_consent", "essential");
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full z-[150] p-4 md:p-8 pointer-events-none">
            <div className={`mx-auto max-w-4xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-[0_-20px_80px_-20px_rgba(0,0,0,0.15)] p-6 md:p-10 pointer-events-auto transform transition-all duration-1000 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

                {!isManaging ? (
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="size-20 rounded-[2rem] bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 shadow-inner">
                            <ShieldCheck className="size-10" style={{ color: THEMES[theme].primary }} />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                Your Privacy, Secured <span className="nepali-font text-slate-400 text-sm ml-2">गोपनीयता हाम्रो प्राथमिकता</span>
                            </h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                                <strong>SewaIT</strong> uses cookies to deliver accurate data and personalized features. We do not sell your data, and we prioritize transparency in everything we do.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                            <button
                                onClick={() => setIsManaging(true)}
                                className="w-full sm:w-auto px-6 py-4 text-xs font-black uppercase tracking-widest text-slate-500 transition-colors"
                                style={{ "--hover-color": THEMES[theme].primary } as any}
                            >
                                <style jsx>{`
                                    button:hover { color: var(--hover-color); }
                                `}</style>
                                Settings
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="w-full sm:w-auto px-12 py-4 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-2xl hover:bg-slate-800 dark:hover:bg-slate-100 active:scale-95 transition-all"
                            >
                                I Understand
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-6">
                            <div className="flex items-center gap-4">
                                <button onClick={() => setIsManaging(false)} className="size-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:opacity-80 transition-colors" style={{ color: THEMES[theme].primary }}>
                                    <ChevronRight className="rotate-180 size-5" />
                                </button>
                                <div>
                                    <h4 className="font-black text-slate-900 dark:text-white tracking-tight">Data Preferences</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">SewaIT Transparency Control</p>
                                </div>
                            </div>
                            <button onClick={() => setShow(false)} className="text-slate-300 hover:text-red-500 transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">Required</span>
                                    <Check className="text-emerald-500 size-5" />
                                </div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Essential Core</h5>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Necessary for secure access, location-based weather fetching, and anti-spam measures.</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 relative" style={{ borderColor: `${THEMES[theme].primary}33` }}>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-black uppercase tracking-wider" style={{ color: THEMES[theme].primary }}>Enhanced</span>
                                    <div className="size-5 rounded-full flex items-center justify-center" style={{ backgroundColor: THEMES[theme].primary }}>
                                        <Check className="text-white size-3" strokeWidth={4} />
                                    </div>
                                </div>
                                <h5 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">Personalization</h5>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">Enables local reminders and remembers your language preferences for a better visit.</p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-2">
                            <Link href="/cookie-policy" className="text-xs font-black hover:underline uppercase tracking-widest" style={{ color: THEMES[theme].primary }}>Read Transparency Policy</Link>
                            <div className="flex gap-4 w-full sm:w-auto">
                                <button
                                    onClick={handleAcceptEssential}
                                    className="flex-1 sm:flex-none px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
                                >
                                    Just Essential
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="flex-1 sm:flex-none px-10 py-4 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all hover:scale-[1.02] active:scale-95"
                                    style={{ backgroundColor: THEMES[theme].primary, boxShadow: `0 20px 25px -5px ${THEMES[theme].primary}33` }}
                                >
                                    Confirm My Choice
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
