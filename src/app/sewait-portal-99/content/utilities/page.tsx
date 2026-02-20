"use client";

import React, { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

export default function UtilitiesConfigPage() {
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(true);
    const [rates, setRates] = useState({
        USD: 133.50,
        EUR: 145.20,
        GBP: 168.45,
        AUD: 87.15,
    });

    React.useEffect(() => {
        fetch('/api/settings?group=FOREX')
            .then(res => res.json())
            .then(data => {
                if (Object.keys(data).length > 0) {
                    setRates({
                        USD: Number(data.FOREX_USD) || 133.50,
                        EUR: Number(data.FOREX_EUR) || 145.20,
                        GBP: Number(data.FOREX_GBP) || 168.45,
                        AUD: Number(data.FOREX_AUD) || 87.15,
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch settings", err);
                setLoading(false);
            });
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    group: 'FOREX',
                    settings: {
                        FOREX_USD: rates.USD.toString(),
                        FOREX_EUR: rates.EUR.toString(),
                        FOREX_GBP: rates.GBP.toString(),
                        FOREX_AUD: rates.AUD.toString(),
                    }
                })
            });

            if (res.ok) alert("Forex rates updated successfully!");
            else alert("Failed to save Forex rates.");
        } catch (error) {
            console.error(error);
            alert("Error saving settings.");
        } finally {
            setSaving(false);
        }
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
                    <p className="text-slate-500 mt-1">Configure parameters for Date, Area, and Currency utilities.</p>
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
                    <FadeIn delay={0.1}>
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3 bg-slate-50/50 dark:bg-slate-800/30">
                                <span className="material-symbols-outlined text-indigo-500">currency_exchange</span>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Forex Rates (NPR)</h3>
                                    <p className="text-sm text-slate-500">Base multiplier for foreign currencies against NPR. This is used in the calendar page's Forex converter.</p>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">USD (US Dollar)</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">Rs.</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={rates.USD}
                                                onChange={(e) => setRates({ ...rates, USD: Number(e.target.value) })}
                                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">EUR (Euro)</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">Rs.</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={rates.EUR}
                                                onChange={(e) => setRates({ ...rates, EUR: Number(e.target.value) })}
                                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">GBP (British Pound)</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">Rs.</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={rates.GBP}
                                                onChange={(e) => setRates({ ...rates, GBP: Number(e.target.value) })}
                                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">AUD (Australian Dollar)</label>
                                        <div className="relative">
                                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">Rs.</span>
                                            <input
                                                type="number"
                                                step="0.01"
                                                value={rates.AUD}
                                                onChange={(e) => setRates({ ...rates, AUD: Number(e.target.value) })}
                                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 py-3 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </FadeIn>

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
                    <FadeIn delay={0.3}>
                        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
                            <div className="absolute top-0 right-0 p-4 opacity-20 transform translate-x-4 -translate-y-4">
                                <span className="material-symbols-outlined text-[100px]">auto_awesome</span>
                            </div>
                            <div className="relative z-10">
                                <h3 className="font-black text-xl mb-3">API Synchronization</h3>
                                <p className="text-sm font-medium text-white/80 leading-relaxed mb-6">
                                    Currently, Foreigh Exchange (Forex) rates require manual updates by the administrator.
                                    Looking for an automated solution? We can integrate direct API feeds from Nepal Rastra Bank (NRB).
                                </p>
                                <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                    Request API Integration
                                </button>
                            </div>
                        </div>
                    </FadeIn>

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
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-slate-500">Forex Converter Usage</span>
                                    <span className="font-black text-slate-900 dark:text-white">1.1K</span>
                                </div>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
