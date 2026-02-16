"use client";

import React from "react";

const modules = [
    {
        name: "News Snippets",
        type: "Manual",
        description: "Manage latest highlights, breaking news, and scrolling tickers for the home feed.",
        lastUpdated: "10 mins ago",
        icon: "newspaper",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBi70vFfrpmcdxbYYuLllu0WkBA0chrDwnLNqLgEB_Xu3WuHiWKEIYZHGJTlottZnnCyotXn6kiFMso2DwMfgrjkLkSouaYzh_3Id411q4SDEYPiGDsgAOKiI1JYRN0TuVkJDpnnv3lE3a2vMY56sCFUrvxg3iGo6eWqxhSiLkKKk70F_fpZcgKnXjMZXT7lfnX1N_xfO24IYNt7VMSgLzj7oQiuxEyS0q8YiBodTt5L8EIlasz6JT74ZcfAqYhi7VGlfEChmQBCKQ",
        typeColor: "bg-emerald-100 text-emerald-700"
    },
    {
        name: "Calendar Events",
        type: "Hybrid",
        description: "Public holidays, festivals, and corporate event schedules for the public calendar.",
        lastUpdated: "2 hours ago",
        icon: "calendar_month",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBsV8p9mwOgqMUgUuSWjKXrN7hZq_KZkI8_A9z3M1pD3TxMuEkVCCsJ3tU_8GET87mlZioxxS1QAmJI5aADZRyR8Oj8edwgNX1SQ-XueCeg6sLAs-rk8mByuRpPPR0s1eq6dyvgNf6aKt_5I-WqWXObspgPwZzw7oWoYs4-xcNeC4ZLvPJy7gf_czi3TmJHE70D_6QEi_8T6tkezG2Bnr89lIw9HV2nQVpiQ42M6uCzzTXQ9Gu1uqv5Pt--RPlu_XeI5YvVXO2uLHI",
        typeColor: "bg-primary/10 text-primary"
    },
    {
        name: "Gold/Silver Rates",
        type: "External API",
        description: "Daily market prices. Includes manual override capability for administrative control.",
        lastUpdated: "5 hours ago",
        icon: "payments",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBx6ucG96W3l9QpnAcDUFzvDGEuGz-T4mi6DpZtrznvGP6uRXSAzC1tMbDLBTxNbjdHl6keOWjnsECGTwi8aveDLWoEIjncBf9BzrjZIDb6uJuhcG9eV8ZgepZOJFLQeLhhnjwlNl2aIonTF97HG1YPe-89bY2XevoD07mk_97zh4_L771DbOndiqdlSXzsJ5zzO8ixpJ2lfKeCEi2kPkEY7l6zDA4RdvcDWnXmHdNIxA0kwObOHKibwnTZZJ9MQUemUjR2B2E94QY",
        typeColor: "bg-amber-100 text-amber-700"
    },
    {
        name: "NEPSE Data",
        type: "Live Feed",
        description: "Stock market data feed management. Monitor and fix syncing issues from exchange.",
        lastUpdated: "Synced 1 min ago",
        icon: "query_stats",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBV7vneZeS5yXmNVIROV0uSl6WiJIxeu-icT3Avpy-uCJso5ryWh_YsczqlSkjiMUKFAn0HF1p93O2paC0lBn-bkgqgdQPmokv-JkIUbNxqsiWme8B4mt-whvynK8xs-o6mAgWOlXWLle3QYew1zJML6dlO8mHzVGY3uCqi3GFNdaJ4T6EZwfN1bTBFX5fj_361yKZyr2YRK-Ox4hhhoHTSpmkJJtr8NpL9YejCIYh1L9NuWrLcQlk5lP_W5J5CjY6vzT-XHQSPqic",
        typeColor: "bg-emerald-100 text-emerald-700",
        isLive: true
    }
];

const healthData = [
    { name: "Nepal News API", type: "External JSON", latency: "240ms", status: "Healthy" },
    { name: "Foreign Exchange", type: "NRB Scraper", latency: "1.2s", status: "Degraded" },
    { name: "Weather Feed", type: "OpenWeather", latency: "310ms", status: "Healthy" }
];

export default function ContentDirectoryPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header Section */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">Content Directory</h2>
                    <p className="text-slate-500 mt-1">Manage and update dynamic data modules for the SajiloSathi platform.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-medium text-slate-600 dark:text-slate-400">System Status: Active</span>
                    </div>
                    <button className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-bold text-sm shadow-lg hover:bg-primary/90 transition-all">
                        <span className="material-symbols-outlined text-sm">refresh</span>
                        Global Refresh
                    </button>
                </div>
            </header>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Modules</p>
                    <p className="text-2xl font-black text-primary">12</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Pending Sync</p>
                    <p className="text-2xl font-black text-amber-500">2</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Updates</p>
                    <p className="text-2xl font-black text-primary">148</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">API Health</p>
                    <p className="text-2xl font-black text-emerald-500">99.9%</p>
                </div>
            </div>

            {/* Content Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {modules.map((mod) => (
                    <div key={mod.name} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                        <div className="h-32 bg-slate-100 dark:bg-slate-950 flex items-center justify-center relative">
                            <img src={mod.image} alt={mod.name} className="w-full h-full object-cover opacity-20 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent"></div>
                            <span className="material-symbols-outlined text-4xl text-primary absolute">{mod.icon}</span>
                        </div>
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{mod.name}</h3>
                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold ${mod.typeColor} uppercase`}>{mod.type}</span>
                            </div>
                            <p className="text-slate-500 text-sm mb-6 leading-relaxed min-h-[40px]">{mod.description}</p>
                            <div className="flex items-center gap-2 mb-4">
                                {mod.isLive ? (
                                    <span className="material-symbols-outlined text-emerald-500 text-sm">check_circle</span>
                                ) : (
                                    <span className="material-symbols-outlined text-slate-400 text-sm">schedule</span>
                                )}
                                <span className={`text-xs ${mod.isLive ? 'text-emerald-600 font-bold' : 'text-slate-400 font-medium'}`}>{mod.lastUpdated}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-primary text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-primary/90 transition-colors">Edit Content</button>
                                <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                                    <span className="material-symbols-outlined text-sm">visibility</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detailed Module Status Table */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-slate-900 dark:text-white">Detailed Module Health</h3>
                    <button className="text-primary text-xs font-bold hover:underline">View System Logs</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 dark:bg-slate-800/30">
                                <th className="px-6 py-3">Module Name</th>
                                <th className="px-6 py-3">Source Type</th>
                                <th className="px-6 py-3">Latency</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {healthData.map((row) => (
                                <tr key={row.name} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors text-slate-900 dark:text-slate-100">
                                    <td className="px-6 py-4 font-semibold text-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-slate-400 text-lg">
                                                {row.name.includes("News") ? "feed" : row.name.includes("Exchange") ? "database" : "cloud_sync"}
                                            </span>
                                            {row.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.type}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{row.latency}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-bold ${row.status === 'Healthy' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                            <span className={`w-1 h-1 rounded-full ${row.status === 'Healthy' ? 'bg-emerald-700' : 'bg-amber-700'}`}></span>
                                            {row.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="material-symbols-outlined text-slate-400 hover:text-primary">settings_applications</button>
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
