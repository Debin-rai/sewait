"use client";

import React from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function SecuritySettings() {
    const { theme } = useTheme();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Security</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your password and security preferences.</p>
            </div>

            <section className="space-y-6">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary" style={{ color: THEMES[theme].primary }}>password</span>
                        <h3 className="font-bold text-slate-900 dark:text-white">Change Password</h3>
                    </div>
                    <div className="p-8 space-y-6 max-w-2xl">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Current Password</label>
                            <input 
                                type="password"
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                            />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">New Password</label>
                                <input 
                                    type="password"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Confirm New Password</label>
                                <input 
                                    type="password"
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                />
                            </div>
                        </div>
                        <button className="px-8 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 hover:bg-primary-dark transition-all active:scale-95" style={{ backgroundColor: THEMES[theme].primary }}>
                            Update Password
                        </button>
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary" style={{ color: THEMES[theme].primary }}>verified_user</span>
                        <h3 className="font-bold text-slate-900 dark:text-white">Two-Factor Authentication</h3>
                    </div>
                    <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1">
                            <p className="text-slate-900 dark:text-white font-bold mb-1">Secure your account with 2FA</p>
                            <p className="text-sm text-slate-500">Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to log in.</p>
                        </div>
                        <button className="px-8 py-3 border-2 border-primary text-primary rounded-2xl text-sm font-bold hover:bg-primary/5 transition-all" style={{ color: THEMES[theme].primary, borderColor: THEMES[theme].primary }}>
                            Enable 2FA
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
