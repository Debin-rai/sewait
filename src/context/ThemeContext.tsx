"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type HeroTheme = "blue" | "red" | "pink" | "green";

interface ThemeContextType {
    heroTheme: HeroTheme;
    setHeroTheme: (theme: HeroTheme) => void;
    showCursor: boolean;
    setShowCursor: (show: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    heroTheme: "blue",
    setHeroTheme: () => { },
    showCursor: true,
    setShowCursor: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [heroTheme, setHeroThemeState] = useState<HeroTheme>("blue");
    const [showCursor, setShowCursorState] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem("sewait_hero_theme") as HeroTheme | null;
        if (savedTheme && ["blue", "red", "pink", "green"].includes(savedTheme)) {
            setHeroThemeState(savedTheme);
        }

        const savedCursor = localStorage.getItem("sewait_show_cursor");
        if (savedCursor !== null) {
            setShowCursorState(savedCursor === "true");
        }
    }, []);

    const setHeroTheme = (theme: HeroTheme) => {
        setHeroThemeState(theme);
        localStorage.setItem("sewait_hero_theme", theme);
    };

    const setShowCursor = (show: boolean) => {
        setShowCursorState(show);
        localStorage.setItem("sewait_show_cursor", show.toString());
    };

    // Prevent hydration mismatch by only rendering after mount
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ heroTheme: "blue", setHeroTheme, showCursor: true, setShowCursor }}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{ heroTheme, setHeroTheme, showCursor, setShowCursor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useHeroTheme() {
    return useContext(ThemeContext);
}
