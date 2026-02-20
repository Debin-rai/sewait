"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Chatbot({ id }: { id?: string }) {
    const pathname = usePathname();

    useEffect(() => {
        if (!id) return;

        // Tawk.to Script Injection
        (window as any).Tawk_API = (window as any).Tawk_API || {};
        (window as any).Tawk_LoadStart = new Date();

        let s1: HTMLScriptElement;
        (function () {
            s1 = document.createElement("script");
            const s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = `https://embed.tawk.to/${id}`;
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            if (s0 && s0.parentNode) {
                s0.parentNode.insertBefore(s1, s0);
            }
        })();

        return () => {
            if (s1 && s1.parentNode) {
                s1.parentNode.removeChild(s1);
            }
        };
    }, [id]);

    useEffect(() => {
        const Tawk_API = (window as any).Tawk_API;
        if (Tawk_API && typeof Tawk_API.hideWidget === 'function') {
            if (pathname === '/sewa-ai') {
                Tawk_API.hideWidget();
            } else {
                Tawk_API.showWidget();
            }
        }
    }, [pathname]);

    return null;
}
