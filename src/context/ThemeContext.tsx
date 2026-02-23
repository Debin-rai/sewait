"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type ThemeType = "default" | "red" | "green" | "pink";

interface ThemeContextType {
    theme: ThemeType;
    setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const THEMES: Record<ThemeType, { name: string; gradient: string; primary: string; secondary: string; text: string }> = {
    default: {
        name: "Default Blue",
        gradient: "linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #3b82f6 100%)",
        primary: "#1e40af",
        secondary: "#3b82f6",
        text: "text-[#1e40af]",
    },
    red: {
        name: "Premium Red",
        gradient: "linear-gradient(135deg, #450a0a 0%, #7f1d1d 50%, #991b1b 100%)",
        primary: "#7f1d1d",
        secondary: "#ef4444",
        text: "text-[#7f1d1d]",
    },
    green: {
        name: "Emerald Green",
        gradient: "linear-gradient(135deg, #022c22 0%, #064e3b 50%, #065f46 100%)",
        primary: "#064e3b",
        secondary: "#10b981",
        text: "text-[#064e3b]",
    },
    pink: {
        name: "Royal Pink",
        gradient: "linear-gradient(135deg, #4a044e 0%, #701a75 50%, #86198f 100%)",
        primary: "#701a75",
        secondary: "#d946ef",
        text: "text-[#701a75]",
    },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setThemeState] = useState<ThemeType>("default");

    useEffect(() => {
        const savedTheme = localStorage.getItem("sewait-theme") as ThemeType;
        if (savedTheme && THEMES[savedTheme]) {
            setThemeState(savedTheme);
        }
    }, []);

    const setTheme = (newTheme: ThemeType) => {
        setThemeState(newTheme);
        localStorage.setItem("sewait-theme", newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
