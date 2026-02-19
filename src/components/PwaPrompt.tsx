"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";

export default function PwaPrompt() {
    const [show, setShow] = useState(false);
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

    useEffect(() => {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (!isMobile) return;

        // Check if already installed
        const isStandalone = window.matchMedia("(display-mode: standalone)").matches
            || (window.navigator as any).standalone === true;
        if (isStandalone) return;

        const handleBeforeInstallPrompt = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);

            // Show the custom prompt only when the browser event fires
            const isDismissed = localStorage.getItem("pwa_prompt_dismissed");
            if (!isDismissed) {
                // Small delay so it doesn't overlap cookie consent or theme picker
                setTimeout(() => setShow(true), 3000);
            }
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

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
        // Don't set permanent dismissal so it appears again next session
        // But avoid re-showing in the same page load
        localStorage.setItem("pwa_prompt_dismissed", "true");
    };

    if (!show || !deferredPrompt) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-[100] animate-in fade-in slide-in-from-bottom-5 duration-700">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-white/20 dark:border-slate-800 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.3)] p-5 flex items-center gap-5 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.5)]"></div>

                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500">
                    <img
                        src="/web-app-manifest-192x192.png"
                        alt="App Icon"
                        className="size-8 object-contain drop-shadow-lg"
                    />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="font-black text-sm text-slate-900 dark:text-white mb-1 tracking-tight">SewaIT Web App</h3>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold leading-tight uppercase tracking-wider">
                        Install through <span className="text-primary">Chrome</span> for the best experience.
                    </p>
                </div>

                <div className="flex flex-col gap-2 shrink-0">
                    <button
                        onClick={handleInstall}
                        className="bg-primary hover:bg-primary-light text-white text-[10px] font-black px-4 py-2.5 rounded-xl transition-all active:scale-90 uppercase tracking-[0.2em] flex items-center gap-2 shadow-lg shadow-primary/30"
                    >
                        <Download size={14} strokeWidth={3} />
                        Install
                    </button>
                    <button
                        onClick={handleDismiss}
                        className="text-[9px] font-black text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-center uppercase tracking-widest transition-colors"
                    >
                        Dismiss
                    </button>
                </div>
            </div>
        </div>
    );
}
