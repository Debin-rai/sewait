"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    setUser(data.user);
                }
            });
    }, []);

    const navLinks = [
        { href: "/settings", label: "Dashboard", icon: "dashboard" },
        { href: "/settings/account", label: "Account Settings", icon: "manage_accounts" },
        { href: "/settings/security", label: "Security", icon: "verified_user" },
        { href: "/settings/notifications", label: "Notifications", icon: "notifications" },
        { href: "/settings/support", label: "Support", icon: "help" },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
            {/* Sidebar Navigation */}
            <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col fixed h-full pt-20 z-20">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-lg flex items-center justify-center text-white shadow-lg" style={{ backgroundColor: THEMES[theme].primary }}>
                            <span className="material-symbols-outlined">settings</span>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-white text-base font-bold leading-none">Settings</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium mt-1 uppercase tracking-widest">User Console</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 px-4 space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                                    isActive
                                        ? "bg-slate-100 dark:bg-slate-800 font-bold shadow-sm"
                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium"
                                }`}
                                style={isActive ? { color: THEMES[theme].primary } : {}}
                            >
                                <span className="material-symbols-outlined text-[22px]">
                                    {link.icon}
                                </span>
                                <span className="text-sm">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>
                {user && (
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                            <div 
                                className="size-8 rounded-full flex items-center justify-center text-[10px] font-bold border border-primary/20 bg-primary/10"
                                style={{ color: THEMES[theme].primary }}
                            >
                                {user.name?.[0] || user.email[0].toUpperCase()}
                            </div>
                            <div className="flex flex-col min-w-0">
                                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">{user.name || user.email.split('@')[0]}</p>
                                <p className="text-[9px] text-slate-500 dark:text-slate-400 uppercase font-black">{user.subscriptionStatus} Account</p>
                            </div>
                        </div>
                    </div>
                )}
            </aside>

            {/* Main Content Area */}
            <main className="ml-64 flex-1 pt-20 overflow-y-auto">
                <div className="p-8 max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
