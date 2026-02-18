"use client";

import { useState, useEffect } from "react";
import { Cookie, X, ChevronRight, Check } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
    const [show, setShow] = useState(false);
    const [isManaging, setIsManaging] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("sewait_cookie_consent");
        if (!consent) {
            const timer = setTimeout(() => setShow(true), 2000); // Wait 2s for "butter-smooth" entry
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
        <div className="fixed bottom-0 left-0 w-full z-[150] p-4 md:p-6 pointer-events-none">
            <div className={`mx-auto max-w-4xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.1)] p-6 md:p-8 pointer-events-auto transform transition-all duration-1000 ease-out ${show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>

                {!isManaging ? (
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="size-16 rounded-2xl bg-primary/5 dark:bg-primary/10 flex items-center justify-center shrink-0 animate-pulse">
                            <Cookie className="text-primary size-8" />
                        </div>

                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                                We value your privacy <span className="nepali-font text-slate-400 text-sm ml-2">तपाईंको गोपनीयता महत्त्वपूर्ण छ</span>
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                                SajiloSathi uses cookies to enhance your experience, ensure secure login, and provide real-time updates. By clicking "Accept All", you agree to our use of cookies for analytics and personalized reminders.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                            <button
                                onClick={() => setIsManaging(true)}
                                className="w-full sm:w-auto px-6 py-3.5 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
                            >
                                Manage Settings
                            </button>
                            <button
                                onClick={handleAcceptAll}
                                className="w-full sm:w-auto px-10 py-3.5 bg-primary text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-95 transition-all"
                            >
                                Accept All
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button onClick={() => setIsManaging(false)} className="text-slate-400 hover:text-primary transition-colors">
                                    <ChevronRight className="rotate-180 size-5" />
                                </button>
                                <h4 className="font-bold text-slate-900 dark:text-white">Cookie Preferences</h4>
                            </div>
                            <button onClick={() => setShow(false)} className="text-slate-300 hover:text-slate-500">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Essential Cookies</span>
                                    <Check className="text-emerald-500 size-4" />
                                </div>
                                <p className="text-[10px] text-slate-500 leading-tight">Required for secure login, CSRF protection, and basic app functionality. Cannot be disabled.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border-2 border-primary/20">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-slate-900 dark:text-white">Analytics & Features</span>
                                    <div className="size-4 rounded-full bg-primary flex items-center justify-center">
                                        <Check className="text-white size-3" strokeWidth={4} />
                                    </div>
                                </div>
                                <p className="text-[10px] text-slate-500 leading-tight">Helps us track performance and store your personal reminders locally in this browser.</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4">
                            <Link href="/cookie-policy" className="text-xs font-bold text-primary hover:underline">Read Full Policy</Link>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleAcceptEssential}
                                    className="px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest"
                                >
                                    Necessary Only
                                </button>
                                <button
                                    onClick={handleAcceptAll}
                                    className="px-8 py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                                >
                                    Save & Accept
                                </button>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
