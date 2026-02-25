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

            {/* AI Units Usage */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                                <p className="text-2xl font-black text-slate-900 dark:text-white">{user.dailyUnitsUsed || 0} / {user.plan === 'FREE' ? 3 : (user.plan === 'PRO' ? 10 : 50)}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{user.plan === 'FREE' ? 'Units per 7 Days' : 'Daily Limit'}</p>
                            </div>
                            <p className="text-xs font-bold text-emerald-500">
                                {user.plan === 'FREE' ? 3 - (user.dailyUnitsUsed || 0) : (user.plan === 'PRO' ? 10 : 50) - (user.dailyUnitsUsed || 0)} Units Left
                            </p>
                        </div>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2.5 overflow-hidden">
                            <div
                                className="h-full transition-all duration-1000"
                                style={{
                                    width: `${user.plan === 'FREE' ? (user.dailyUnitsUsed / 3) * 100 : (user.plan === 'PRO' ? (user.dailyUnitsUsed / 10) * 100 : (user.dailyUnitsUsed / 50) * 100)}%`,
                                    backgroundColor: THEMES[theme].primary
                                }}
                            />
                        </div>
                        {user.plan === 'FREE' && user.lastResetDate && (
                            <p className="text-[10px] font-medium text-slate-400 italic">
                                Cycle resets on: {new Date(new Date(user.lastResetDate).getTime() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>

                {/* Subscription Status */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-amber-100 text-amber-600">
                            <span className="material-symbols-outlined">workspace_premium</span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Plan Type</h3>
                    </div>
                    <div className="flex flex-col h-24 justify-between">
                        <div>
                            <p className="text-xl font-black text-slate-900 dark:text-white uppercase">{user.plan || 'FREE'}</p>
                            <p className="text-xs font-medium text-slate-500">Status: <span className="text-emerald-500 font-bold">{user.subscriptionStatus || 'ACTIVE'}</span></p>
                        </div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                            {user.plan === 'FREE' ? 'Basic Features & Limits' : 'Full Access & Priority'}
                        </p>
                    </div>
                </div>

                {/* Billing / Expiry */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                            <span className="material-symbols-outlined">event_note</span>
                        </div>
                        <h3 className="font-bold text-slate-900 dark:text-white">Billing Info</h3>
                    </div>
                    <div className="flex flex-col h-24 justify-between">
                        <div>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">Next Renewal</p>
                            <p className="text-xs text-slate-500">{user.subscriptionExpiry ? new Date(user.subscriptionExpiry).toLocaleDateString() : 'Never (Free)'}</p>
                        </div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            <span className="size-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                            Auto-Renew Off
                        </div>
                    </div>
                </div>
            </div>

            {/* Subscription Plans Section */}
            <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 md:p-12 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Available Subscription Plans</h3>
                        <p className="text-slate-500 font-bold text-sm tracking-wide mt-1">Choose the best plan to unlock your digital potential.</p>
                    </div>
                    {user.plan === 'FREE' && (
                        <div className="px-4 py-2 bg-primary/10 rounded-full text-primary text-[10px] font-black uppercase tracking-widest animate-pulse">
                            Upgrade Recommended
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { id: 'FREE', name: 'Free Citizen', price: 'Rs. 0', features: ['3 AI Units / 7 Days', 'Gov Service Guides', 'Ad Supported'] },
                        { id: 'PRO', name: 'Monthly Pro', price: 'Rs. 400', features: ['Unlimited AI Access', 'Document Saving', 'Priority Help', 'Ad-Free'] },
                        { id: 'BUSINESS', name: 'Yearly Biz', price: 'Rs. 3600', features: ['All Pro Features', '800 Units / Year', 'Business Support'] },
                    ].map((p) => (
                        <div key={p.id} className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center text-center ${user.plan === p.id ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}>
                            <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-[0.2em] mb-2">{p.name}</h4>
                            <p className="text-2xl font-black text-primary mb-6">{p.price}</p>
                            <ul className="space-y-3 mb-8 flex-1">
                                {p.features.map((f, i) => (
                                    <li key={i} className="text-xs font-bold text-slate-500 flex items-center gap-2 justify-center">
                                        <div className="size-1 bg-primary rounded-full" /> {f}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={user.plan === p.id ? '#' : '/premium'}
                                className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${user.plan === p.id ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default' : 'bg-primary text-white hover:scale-105 shadow-lg shadow-primary/20'}`}
                            >
                                {user.plan === p.id ? 'Active Plan' : (p.id === 'FREE' ? 'Default' : 'Upgrade')}
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* Support & Settings Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/settings/security" className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left group">
                    <span className="material-symbols-outlined text-primary mb-3 group-hover:scale-110 transition-transform block" style={{ color: THEMES[theme].primary }}>password</span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Security</p>
                </a>
                <a href="/settings/support" className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left group">
                    <span className="material-symbols-outlined text-primary mb-3 group-hover:scale-110 transition-transform block" style={{ color: THEMES[theme].primary }}>contact_support</span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Support</p>
                </a>
                <a href="/settings/notifications" className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all text-left group">
                    <span className="material-symbols-outlined text-primary mb-3 group-hover:scale-110 transition-transform block" style={{ color: THEMES[theme].primary }}>notifications</span>
                    <p className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-widest">Alerts</p>
                </a>
                <a href="/sewa-ai" className="bg-slate-900 dark:bg-white p-6 rounded-2xl border border-slate-900 dark:border-white shadow-sm hover:shadow-md transition-all text-left group">
                    <span className="material-symbols-outlined text-white dark:text-slate-900 mb-3 group-hover:scale-110 transition-transform block">description</span>
                    <p className="text-xs font-bold text-white dark:text-slate-900 uppercase tracking-widest">New Draft</p>
                </a>
            </div>
        </div>
    );
}
