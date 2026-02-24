"use client";

import React from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function NotificationSettings() {
    const { theme } = useTheme();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Notifications</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage how you receive alerts, reminders, and system updates from Sewa IT.</p>
            </div>

            <div className="space-y-8">
                {/* Billing Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4 ml-1">
                        <span className="material-symbols-outlined text-primary" style={{ color: THEMES[theme].primary }}>payments</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Billing & Subscription</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col gap-1">
                                <p className="text-slate-900 dark:text-white font-bold text-sm">Payment expiry reminders</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Receive alerts via email when your subscription is about to expire or needs renewal.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox"/>
                                <div 
                                    className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                                    style={{ 
                                        backgroundColor: 'var(--toggle-bg)',
                                        // We can't easily use style for peer-checked background without a wrapper or extra CSS
                                    } as any}
                                >
                                    <style jsx>{`
                                        div { --toggle-bg: #e2e8f0; }
                                        input:checked + div { background-color: ${THEMES[theme].primary} !important; }
                                    `}</style>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Usage Section */}
                <section>
                    <div className="flex items-center gap-2 mb-4 ml-1">
                        <span className="material-symbols-outlined text-primary" style={{ color: THEMES[theme].primary }}>analytics</span>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Usage Alerts</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex flex-col gap-1">
                                <p className="text-slate-900 dark:text-white font-bold text-sm">Document usage alerts</p>
                                <p className="text-slate-500 dark:text-slate-400 text-xs">Get notified immediately when you reach 80% of your monthly document processing limit.</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input defaultChecked className="sr-only peer" type="checkbox"/>
                                <div 
                                    className="w-11 h-6 bg-slate-200 peer-focus:outline-none dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"
                                >
                                    <style jsx>{`
                                        div { background-color: #e2e8f0; }
                                        input:checked + div { background-color: ${THEMES[theme].primary} !important; }
                                    `}</style>
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Footer Help */}
                <div className="mt-12 p-8 bg-primary/5 dark:bg-primary/10 rounded-3xl border border-primary/10 flex items-start gap-4" style={{ backgroundColor: `${THEMES[theme].primary}05`, borderColor: `${THEMES[theme].primary}10` }}>
                    <span className="material-symbols-outlined text-primary mt-0.5" style={{ color: THEMES[theme].primary }}>info</span>
                    <div>
                        <p className="text-slate-900 dark:text-white font-bold text-sm">Need more specific control?</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">You can manage granular notification preferences for each team member in the User Management section.</p>
                        <button className="mt-4 text-primary font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-1" style={{ color: THEMES[theme].primary }}>
                            View System Logs
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-4">
                <button className="px-8 py-3 text-slate-500 font-bold text-sm hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors">Discard changes</button>
                <button className="px-10 py-3 bg-primary text-white font-bold text-sm rounded-2xl hover:bg-primary-dark shadow-xl shadow-primary/20 transition-all active:scale-95" style={{ backgroundColor: THEMES[theme].primary }}>Save Preferences</button>
            </div>
        </div>
    );
}
