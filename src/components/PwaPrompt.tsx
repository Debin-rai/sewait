"use client";

import { useState, useEffect } from "react";
import { X, Download, Smartphone } from "lucide-react";

export default function PwaPrompt() {
    const [show, setShow] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) return;

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // Timer to show popup every 10 seconds if not dismissed and prompt is available
        const timer = setInterval(() => {
            const isDismissed = localStorage.getItem("pwa_prompt_dismissed");
            if (!isDismissed) {
                setShow(true);
            }
        }, 10000);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
            clearInterval(timer);
        };
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === "accepted") {
            setDeferredPrompt(null);
            setShow(false);
        }
    };

    const handleDismiss = () => {
        setShow(false);
        // We set a flag to avoid constant annoyance, but the user asked for 10s.
        // I'll honor the 10s request by NOT setting a long-term dismissal if they just close it,
        // but maybe I'll add a "Don't show again" option later if they complain.
        // For now, let's keep it visible per user instruction.
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100] animate-in fade-in slide-in-from-bottom-5 duration-500">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 md:p-5 flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>

                <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Smartphone className="text-primary size-6" />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white mb-0.5">Install SewaIT App</h3>
                    <p className="text-[10px] text-slate-500 font-medium leading-tight">Access Nepali Calendar & Rates faster from your home screen.</p>
                </div>

                <div className="flex flex-col gap-2">
                    <button
                        onClick={handleInstall}
                        className="bg-primary text-white text-[10px] font-black px-3 py-2 rounded-lg transition-transform active:scale-95 uppercase tracking-widest flex items-center gap-1.5"
                    >
                        <Download size={12} strokeWidth={3} />
                        Install
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="text-[10px] font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-center uppercase tracking-tighter"
                    >
                        Maybe Later
                    </button>
                </div>

                <button
                    onClick={() => setShow(false)}
                    className="absolute top-2 right-2 text-slate-300 hover:text-slate-500 transition-colors"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
}
