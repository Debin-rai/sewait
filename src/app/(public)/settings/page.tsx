"use client";

import React, { useState, useEffect } from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function SettingsDashboard() {
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

    if (!user) return (
        <div className="flex items-center justify-center h-64">
            <div className="size-8 border-4 border-slate-100 border-t-primary rounded-full animate-spin" style={{ borderTopColor: THEMES[theme].primary }}></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Manage your account usage, subscription, and recent activity.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* AI Units Usage */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg" style={{ color: THEMES[theme].primary, backgroundColor: `${THEMES[theme].primary}10` }}>
                            <span className="material-symbols-outlined">auto_fix_high</span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">AI Units Usage</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{user.aiUnitsUsedThisMonth || 0} / {user.aiUnitsLimit || 3}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Monthly Units</p>
                            </div>
                            <p className="text-xs font-bold text-emerald-500">
                                {user.aiUnitsLimit ? Math.round(((user.aiUnitsLimit - user.aiUnitsUsedThisMonth) / user.aiUnitsLimit) * 100) : 0}% Left
                            </p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                            <div 
                                className="h-full transition-all duration-1000" 
                                style={{ 
                                    width: `${user.aiUnitsLimit ? (user.aiUnitsUsedThisMonth / user.aiUnitsLimit) * 100 : 0}%`,
                                    backgroundColor: THEMES[theme].primary
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Subscription Status */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                            <span className="material-symbols-outlined">workspace_premium</span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Subscription</h3>
                    </div>
                    <div className="flex flex-col h-24 justify-between">
                        <div>
                            <p className="text-xl font-black text-slate-900 dark:text-white">{user.plan || 'FREE'} PLAN</p>
                            <p className="text-xs font-medium text-slate-500">Active until: {user.subscriptionExpiry ? new Date(user.subscriptionExpiry).toLocaleDateString() : 'Forever'}</p>
                        </div>
                        <a href="/premium" className="text-xs font-bold hover:underline flex items-center gap-1" style={{ color: THEMES[theme].primary }}>
                            Upgrade Plan <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </a>
                    </div>
                </div>

                {/* Last Activity */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                            <span className="material-symbols-outlined">history</span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Last Activity</h3>
                    </div>
                    <div className="flex flex-col h-24 justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Last AI Request</p>
                            <p className="text-xs text-slate-500">{user.lastRequestAt ? new Date(user.lastRequestAt).toLocaleString() : 'No activity yet'}</p>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            System Online
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <section className="bg-primary/5 dark:bg-primary/10 rounded-3xl p-8 border border-primary/10" style={{ borderColor: `${THEMES[theme].primary}20`, backgroundColor: `${THEMES[theme].primary}05` }}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <a href="/sewa-ai" className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left group">
                        <span className="material-symbols-outlined text-primary mb-2 group-hover:scale-110 transition-transform block" style={{ color: THEMES[theme].primary }}>description</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">New Document</p>
                    </a>
                    <a href="/settings/security" className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left group">
                        <span className="material-symbols-outlined text-primary mb-2 group-hover:scale-110 transition-transform block" style={{ color: THEMES[theme].primary }}>password</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Change Password</p>
                    </a>
                    <a href="/settings/support" className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left group">
                        <span className="material-symbols-outlined text-primary mb-2 group-hover:scale-110 transition-transform block" style={{ color: THEMES[theme].primary }}>contact_support</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Get Support</p>
                    </a>
                    <a href="/settings/notifications" className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left group">
                        <span className="material-symbols-outlined text-primary mb-2 group-hover:scale-110 transition-transform block" style={{ color: THEMES[theme].primary }}>notifications</span>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">Preferences</p>
                    </a>
                </div>
            </section>
        </div>
    );
}
