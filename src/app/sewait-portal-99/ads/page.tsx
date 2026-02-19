"use client";

import React, { useState, useEffect, useRef } from "react";

// Categorized placements for granular control
const PLACEMENT_CATEGORIES = {
    "HOME": [
        { id: "HOME_HERO", name: "Hero Banner (Top)", size: "1200x400" },
        { id: "HOME_SIDEBAR", name: "Sidebar Widget", size: "400x400" },
        { id: "HOME_FOOTER", name: "Footer Strip", size: "1200x200" }
    ],
    "CALENDAR": [
        { id: "CALENDAR_TOP", name: "Top Banner", size: "1200x200" },
        { id: "CALENDAR_SIDEBAR", name: "Sidebar Widget", size: "400x400" }
    ],
    "NEPSE": [
        { id: "NEPSE_TOP", name: "Top Info Bar", size: "1200x150" }
    ],
    "GOLD_SILVER": [
        { id: "GOLD_HEADER", name: "Header Banner", size: "1200x300" }
    ],
    "SERVICES": [
        { id: "GOV_LIST", name: "List Interstitial", size: "800x200" }
    ],
    "WEATHER": [
        { id: "WEATHER_BOTTOM", name: "Widget Bottom", size: "400x200" }
    ]
};

import Link from "next/link";

export default function AdsManagementPage() {
    const [loading, setLoading] = useState(false);
    const [ads, setAds] = useState<any[]>([]);

    useEffect(() => {
        fetchAds();
    }, []);

    const fetchAds = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/ads");
            const data = await res.json();
            if (Array.isArray(data)) setAds(data);
        } catch (error) {
            console.error("Failed to fetch ads", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Permanently remove campaign: "${name}"?`)) return;
        try {
            await fetch(`/api/sewait-portal-99/ads?id=${id}`, { method: "DELETE" });
            setAds(ads.filter(ad => ad.id !== id));
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-end gap-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 dark:text-white tracking-tighter">Ad Studio</h2>
                    <p className="text-slate-500 font-bold uppercase text-[10px] tracking-[0.2em] mt-2">Intelligence & Campaign Management</p>
                </div>
                <Link
                    href="/sewait-portal-99/ads/launch"
                    className="bg-primary hover:bg-primary-light text-white px-8 py-4 rounded-2xl flex items-center gap-3 font-black text-sm shadow-2xl shadow-primary/20 transition-all active:scale-95 uppercase tracking-widest"
                >
                    <span className="material-symbols-outlined text-xl">rocket_launch</span>
                    New Campaign
                </Link>
            </header>

            {/* Ads List Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            <tr>
                                <th className="px-10 py-6">Campaign Info</th>
                                <th className="px-10 py-6">Target slot</th>
                                <th className="px-10 py-6">Analytics</th>
                                <th className="px-10 py-6">Status</th>
                                <th className="px-10 py-6 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {ads.length === 0 && !loading && (
                                <tr>
                                    <td colSpan={5} className="px-10 py-32 text-center">
                                        <div className="flex flex-col items-center gap-4 opacity-30">
                                            <span className="material-symbols-outlined text-7xl text-slate-300">deployed_code</span>
                                            <p className="font-black uppercase tracking-[0.3em] text-[10px]">No active campaigns ready</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                            {ads.map((ad) => (
                                <tr key={ad.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-all group">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-6">
                                            <div className="size-20 rounded-[1.5rem] bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden shadow-inner border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform duration-500">
                                                <img src={ad.imageUrl} alt={ad.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900 dark:text-white text-base leading-tight tracking-tight">{ad.name}</p>
                                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.1em] mt-1.5 flex items-center gap-2">
                                                    <span className="size-1 bg-slate-400 rounded-full"></span>
                                                    {ad.client || 'Direct Client'}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[9px] font-black text-primary bg-primary/5 border border-primary/10 px-3 py-1 rounded-lg w-fit uppercase tracking-widest">{ad.position.split('_')[0]}</span>
                                            <span className="text-xs font-bold text-slate-500 lowercase tracking-tight">{ad.position.split('_').slice(1).join(' ')}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-sm text-slate-500">touch_app</span>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-black text-slate-900 dark:text-white">{ad.clicks || 0}</span>
                                                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Interactions</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <span className={`size-2 rounded-full ${ad.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-slate-400'}`}></span>
                                            <span className={`text-[10px] font-black uppercase tracking-widest ${ad.status === 'ACTIVE' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500'}`}>
                                                {ad.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                className="size-10 flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary text-slate-500 rounded-xl transition-all"
                                                title="View Analytics"
                                            >
                                                <span className="material-symbols-outlined text-xl">monitoring</span>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(ad.id, ad.name)}
                                                className="size-10 flex items-center justify-center bg-red-50 dark:bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-xl transition-all"
                                                title="Terminate Campaign"
                                            >
                                                <span className="material-symbols-outlined text-xl">delete_sweep</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
