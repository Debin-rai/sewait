"use client";

/**
 * Utility for managing cookies in SewaIT
 */

export const getCookie = (name: string): string | null => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
};

export const setCookie = (name: string, value: string, days = 30) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Strict; Secure`;
};

/**
 * Generates or retrieves a persistent visitor hash for DAU/Retention tracking
 */
export const getVisitorId = (): string => {
    let visitorId = getCookie('sajilosathi_visitor_id');
    if (!visitorId) {
        visitorId = crypto.randomUUID();
        setCookie('sajilosathi_visitor_id', visitorId, 365); // 1 year retention
    }
    return visitorId;
};

/**
 * Tracks ad impressions in cookies to prevent fatigue
 */
export const trackAdImpression = (adId: string) => {
    const impressions = JSON.parse(getCookie('sajilosathi_ad_hits') || '{}');
    impressions[adId] = (impressions[adId] || 0) + 1;
    setCookie('sajilosathi_ad_hits', JSON.stringify(impressions), 1); // 1 day window
    return impressions[adId];
};
