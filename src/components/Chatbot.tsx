"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Chatbot({ id }: { id?: string }) {
    const pathname = usePathname();
    const [shouldLoad, setShouldLoad] = useState(false);

    // 1. Wait for user interaction or 7s timeout to load the widget
    useEffect(() => {
        if (!id) return;

        const loadTawk = () => {
            if (shouldLoad) return;
            setShouldLoad(true);

            // Cleanup listeners once triggered
            window.removeEventListener('scroll', loadTawk);
            window.removeEventListener('mousemove', loadTawk);
            window.removeEventListener('touchstart', loadTawk);
            window.removeEventListener('keydown', loadTawk);
        };

        // Add typical interaction listeners
        window.addEventListener('scroll', loadTawk, { passive: true, once: true });
        window.addEventListener('mousemove', loadTawk, { passive: true, once: true });
        window.addEventListener('touchstart', loadTawk, { passive: true, once: true });
        window.addEventListener('keydown', loadTawk, { passive: true, once: true });

        // Fallback load after 7 seconds if user is completely idle,
        // sufficient to bypass Googlebot's initial rendering window.
        const timeoutId = setTimeout(loadTawk, 7000);

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('scroll', loadTawk);
            window.removeEventListener('mousemove', loadTawk);
            window.removeEventListener('touchstart', loadTawk);
            window.removeEventListener('keydown', loadTawk);
        };
    }, [id, shouldLoad]);

    // 2. Inject script when shouldLoad is true
    useEffect(() => {
        if (!shouldLoad || !id) return;

        // Tawk.to Script Injection
        (window as any).Tawk_API = (window as any).Tawk_API || {};
        (window as any).Tawk_LoadStart = new Date();

        // Custom styling to avoid overlapping with MobileBottomNav
        (window as any).Tawk_API.customStyle = {
            visibility: {
                desktop: {
                    position: 'br',
                    xOffset: '20px',
                    yOffset: '20px'
                },
                mobile: {
                    position: 'br',
                    xOffset: '10px',
                    yOffset: '85px' // Shifting up above bottom nav
                }
            }
        };

        let s1: HTMLScriptElement;
        (function () {
            s1 = document.createElement("script");
            const s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = `https://embed.tawk.to/${id}`;
            s1.charset = 'UTF-8';
            if (s0 && s0.parentNode) {
                s0.parentNode.insertBefore(s1, s0);
            }
        })();

        return () => {
            if (s1 && s1.parentNode) {
                s1.parentNode.removeChild(s1);
            }
        };
    }, [shouldLoad, id]);

    // 3. Page navigation visibility logic
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
