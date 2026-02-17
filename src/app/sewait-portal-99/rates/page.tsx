"use client";

import React, { useState } from "react";

const historicalRates = [
    { date: "Oct 24", gold: 118000, silver: 1400, change: "+500", trend: "up" },
    { date: "Oct 23", gold: 117500, silver: 1390, change: "-200", trend: "down" },
    { date: "Oct 22", gold: 117700, silver: 1410, change: "+1000", trend: "up" },
    { date: "Oct 21", gold: 116700, silver: 1400, change: "0", trend: "stable" },
];

export default function RefinedRatesPage() {
    const [loading, setLoading] = useState(false);
    const [gold24, setGold24] = useState("118000");
    const [silver, setSilver] = useState("1400");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Mock sync
        setTimeout(() => {
            setLoading(false);
            alert("Rates updated successfully!");
        }, 800);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Market Rates Management</h2>
                <p className="text-slate-500 mt-1">Update and monitor daily gold and silver market prices.</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Update Form */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Set Today&apos;s Rates</h3>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Gold (24 Carat) / Tola</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs.</span>
                                    <input
                                        type="number"
                                        value={gold24}
                                        onChange={(e) => setGold24(e.target.value)}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Silver / Tola</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">Rs.</span>
                                    <input
                                        type="number"
                                        value={silver}
                                        onChange={(e) => setSilver(e.target.value)}
                                        className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800/50 text-slate-900 dark:text-white font-bold focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div className="flex gap-3 text-slate-500 text-xs italic">
                                <span className="material-symbols-outlined text-sm">info</span>
                                <p>Updates will be reflected immediately across the main app widgets and user dashboard.</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? "Processing..." : (
                                <>
                                    <span className="material-symbols-outlined">sync</span>
                                    Publish New Rates
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* History Table */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Price History</h3>
                        <button className="text-primary dark:text-blue-400 text-sm font-bold hover:underline">Download CSV</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                <tr>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4 text-center">Gold (24K)</th>
                                    <th className="px-6 py-4 text-center">Silver</th>
                                    <th className="px-6 py-4 text-right">Change</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-sm font-medium">
                                {historicalRates.map((h, i) => (
                                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                        <td className="px-6 py-4 text-slate-900 dark:text-white">{h.date}</td>
                                        <td className="px-6 py-4 text-center text-slate-700 dark:text-slate-300">Rs. {h.gold.toLocaleString()}</td>
                                        <td className="px-6 py-4 text-center text-slate-700 dark:text-slate-300">Rs. {h.silver.toLocaleString()}</td>
                                        <td className={`px-6 py-4 text-right font-bold ${h.trend === 'up' ? 'text-green-600' : h.trend === 'down' ? 'text-red-500' : 'text-slate-400'}`}>
                                            {h.change !== '0' && (h.trend === 'up' ? '+' : h.trend === 'down' ? '' : '')} {h.change}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
