"use client";

import React, { useState, useEffect } from "react";

export default function RefinedRatesPage() {
    const [loading, setLoading] = useState(false);
    const [gold24, setGold24] = useState("");
    const [gold22, setGold22] = useState("");
    const [silver, setSilver] = useState("");

    useEffect(() => {
        fetchCurrentRates();
    }, []);

    const fetchCurrentRates = async () => {
        try {
            const goldRes = await fetch("/api/sewait-portal-99/rates/gold");
            const goldData = await goldRes.json();
            if (goldData.id) {
                setGold24(goldData.gold24.toString());
                setGold22(goldData.gold22?.toString() || "");
                setSilver(goldData.silver.toString());
            }
        } catch (error) {
            console.error("Failed to fetch current rates", error);
        }
    };

    const handleGoldSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/rates/gold", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ gold24, gold22, silver }),
            });
            if (res.ok) alert("Gold & Silver rates updated!");
            else alert("Failed to update gold rates.");
        } catch (err) {
            alert("Error updating gold rates.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Market Rates Management</h2>
                <p className="text-slate-500 mt-1">Update and monitor daily market bullion prices.</p>
            </div>

            <div className="max-w-4xl">
                {/* Gold Update Form */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-lg">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">Gold & Silver Rates</h3>
                    </div>

                    <form onSubmit={handleGoldSubmit} className="space-y-6">
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
                                        required
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
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 bg-amber-500 text-white font-black rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">sync</span>
                            Update Bullion Rates
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
