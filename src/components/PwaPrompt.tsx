"use client";

import { useState, useEffect } from "react";
import { Download, Share, PlusSquare, X } from "lucide-react";

export default function PwaPrompt() {
    const [show, setShow] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const ua = navigator.userAgent;
        const ios = /iPhone|iPad|iPod/i.test(ua);
        const android = /Android/i.test(ua);

        setIsIOS(ios);

        if (!ios && !android) return;

        // Check if already installed
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches
            || (window.navigator as any).standalone === true;

        if (isStandalone) return;

        const checkAndTrigger = () => {
            const isDismissed = localStorage.getItem("pwa_prompt_dismissed");
            const consent = localStorage.getItem("sewait_cookie_consent");
            if (!isDismissed && consent && !show) {
                setTimeout(() => setShow(true), 15000);
            }
        };

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            checkAndTrigger();
        };

        // For iOS, we show it manually since beforeinstallprompt isn't supported
        if (isIOS) {
            checkAndTrigger();
        }

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        const interval = setInterval(checkAndTrigger, 2000);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            clearInterval(interval);
        };
    }, [show, isIOS]);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setShow(false);
            localStorage.setItem("pwa_prompt_dismissed", "true");
        }
    };

    const handleDismiss = () => {
        setShow(false);
        // Set temporary dismissal for the session
        localStorage.setItem("pwa_prompt_dismissed", "true");
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-md z-[100] animate-in fade-in slide-in-from-bottom-10 duration-1000">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-3xl border border-white/20 dark:border-slate-800 rounded-[2.5rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4)] p-6 relative overflow-hidden group">
                <button
                    onClick={handleDismiss}
                    className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                    <X size={18} />
                </button>

                <div className="flex items-center gap-5 mb-6">
                    <div className="size-16 rounded-[1.5rem] bg-gradient-to-br from-primary to-primary-dark p-0.5 shadow-xl shadow-primary/20">
                        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[1.4rem] flex items-center justify-center overflow-hidden">
                            <img
                                src="/web-app-manifest-192x192.png"
                                alt="App Icon"
                                className="size-10 object-contain"
                            />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-black text-lg text-slate-900 dark:text-white leading-tight tracking-tight">SewaIT Official App</h3>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Experience Nepal in your pocket</p>
                    </div>
                </div>

                {!isIOS ? (
                    <div className="space-y-4">
                        <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                            Install the SewaIT web app for faster access and an immersive full-screen experience.
                        </p>
                        <button
                            onClick={handleInstall}
                            disabled={!deferredPrompt}
                            className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-primary/30 disabled:opacity-50"
                        >
                            <Download size={18} strokeWidth={3} />
                            INSTALL APP
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2 text-center">How to Install on iOS</p>
                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-primary">
                                    <Share size={16} />
                                </div>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">1. Tap the <span className="text-primary italic">Share</span> button below</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded-lg bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-primary">
                                    <PlusSquare size={16} />
                                </div>
                                <p className="text-xs font-bold text-slate-700 dark:text-slate-200">2. Select <span className="text-primary italic">"Add to Home Screen"</span></p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-4 flex justify-center">
                    <div className="h-1 w-12 bg-slate-200 dark:bg-slate-700 rounded-full" />
                </div>
            </div>
        </div>
    );
}
