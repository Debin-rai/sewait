"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type HeroTheme = "blue" | "red" | "pink" | "green";

interface ThemeContextType {
    heroTheme: HeroTheme;
    setHeroTheme: (theme: HeroTheme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    heroTheme: "blue",
    setHeroTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [heroTheme, setHeroThemeState] = useState<HeroTheme>("blue");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = localStorage.getItem("sewait_hero_theme") as HeroTheme | null;
        if (saved && ["blue", "red", "pink", "green"].includes(saved)) {
            setHeroThemeState(saved);
        }
    }, []);

    const setHeroTheme = (theme: HeroTheme) => {
        setHeroThemeState(theme);
        localStorage.setItem("sewait_hero_theme", theme);
    };

    // Prevent hydration mismatch by only rendering after mount
    if (!mounted) {
        return (
            <ThemeContext.Provider value={{ heroTheme: "blue", setHeroTheme }}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={{ heroTheme, setHeroTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useHeroTheme() {
    return useContext(ThemeContext);
}
