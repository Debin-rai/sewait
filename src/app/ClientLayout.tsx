"use client";

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemePickerPopup from "@/components/ThemePickerPopup";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <ThemeProvider>
                {children}
                <ThemePickerPopup />
            </ThemeProvider>
        </LanguageProvider>
    );
}
