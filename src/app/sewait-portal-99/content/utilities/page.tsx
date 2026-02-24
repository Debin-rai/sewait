"use client";

import React, { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export default function UtilitiesConfigPage() {
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        // Add logic for saving other utility settings here if needed in the future
        setTimeout(() => {
            alert("Utility settings saved (No active configurable fields currently).");
            setSaving(false);
        }, 500);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Link href="/sewait-portal-99/content" className="text-sm font-bold text-slate-400 hover:text-primary transition-colors flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Content Directory
                        </Link>
                    </div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                        <span className="material-symbols-outlined text-4xl text-indigo-500">calculate</span>
                        Utility Converters
                    </h2>
                    <p className="text-slate-500 mt-1">Configure parameters for Date and Area utilities.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95 disabled:opacity-70"
                    >
                        {saving ? (
                            <span className="material-symbols-outlined text-sm animate-spin">sync</span>
                        ) : (
                            <span className="material-symbols-outlined text-sm">save</span>
                        )}
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Main Configuration form */}
                <div className="xl:col-span-2 space-y-6">
                    <FadeIn delay={0.2}>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/30">
                                <span className="material-symbols-outlined text-emerald-500">landscape</span>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Land Area Constants</h3>
                                    <p className="text-sm text-slate-500">Read-only constants to ensure mathematical accuracy inside the app.</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">1 Ropani</p>
                                        <p className="text-lg font-black text-slate-900 dark:text-white">16 Aana</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">1 Aana</p>
                                        <p className="text-lg font-black text-slate-900 dark:text-white">4 Paisa</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">1 Paisa</p>
                                        <p className="text-lg font-black text-slate-900 dark:text-white">4 Daam</p>
                                    </div>
                                    <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-center">
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">1 Ropani (Sq.Ft)</p>
                                        <p className="text-lg font-black text-slate-900 dark:text-white">5,476</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <FadeIn delay={0.4}>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Module Statistics</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Date Converter Usage</span>
                                    <span className="font-black text-slate-900 dark:text-white">12.4K</span>
                                </div>
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Area Converter Usage</span>
                                    <span className="font-black text-slate-900 dark:text-white">8.2K</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
