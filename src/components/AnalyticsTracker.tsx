"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function AnalyticsTracker() {
    const pathname = usePathname();
    const initialized = useRef(false);

    useEffect(() => {
        // Track session start if not already tracked
        if (!sessionStorage.getItem('sewait_session_start')) {
            sessionStorage.setItem('sewait_session_start', Date.now().toString());
        }

        // Only track once per path change
        const recordHit = async () => {
            try {
                // Check if device is excluded
                const { getCookie } = await import("@/lib/cookies");
                if (getCookie('sewait_exclude_analytics') === 'true') {
                    console.log("Analytics: Device excluded, skipping track.");
                    return;
                }

                // Detect device type
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                const device = isMobile ? "mobile" : "desktop";

                // Get or generate visitor ID for retention tracking
                const { getVisitorId } = await import("@/lib/cookies");
                const visitorId = getVisitorId();

                await fetch("/api/sewait-portal-99/analytics", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        path: pathname,
                        device: device,
                        visitorId: visitorId
                    }),
                });
            } catch (error) {
                // Silent fail for analytics tracking
                console.error("Analytics failed:", error);
            }
        };

        recordHit();
    }, [pathname]);

    return null; // This component doesn't render anything
}
