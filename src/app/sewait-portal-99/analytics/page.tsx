"use client";

import React, { useState, useEffect } from "react";

export default function AnalyticsDashboardPage() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<{ daily: any[], visitors: any[] }>({ daily: [], visitors: [] });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/analytics");
            const result = await res.json();
            if (result.daily && result.visitors) {
                setData(result);
            }
        } catch (error) {
            console.error("Failed to fetch analytics", error);
        } finally {
            setLoading(false);
        }
    };

    const totalHits = data.visitors.reduce((acc, curr) => acc + curr.hits, 0);
    const maxDailyHits = Math.max(...data.daily.map(d => d.hits), 1);

    // Group daily data for chart
    const dailyChart = [...data.daily].reverse().slice(-14); // Last 14 days

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-primary dark:text-blue-400 tracking-tight">Real-Time Analytics</h2>
                    <p className="text-slate-500 font-medium">Tracking platform growth and user engagement patterns.</p>
                </div>
                <button
                    onClick={fetchAnalytics}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-colors"
                >
                    <span className="material-symbols-outlined text-lg">refresh</span>
                    <span>Sync Metrics</span>
                </button>
            </header>

            {/* main metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-b-4 border-primary shadow-sm hover:translate-y-[-2px] transition-transform">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Lifetime Hits</p>
                    <h3 className="text-4xl font-black text-slate-800 dark:text-white mt-2">{totalHits.toLocaleString()}</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-b-4 border-blue-400 shadow-sm hover:translate-y-[-2px] transition-transform">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Active Pages</p>
                    <h3 className="text-4xl font-black text-slate-800 dark:text-white mt-2">{data.visitors.length}</h3>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border-b-4 border-[#07883b] shadow-sm hover:translate-y-[-2px] transition-transform">
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest">Growth Trend</p>
                    <h3 className={`text-4xl font-black mt-2 ${(data as any).hitsTrend >= 0 ? 'text-[#07883b]' : 'text-red-600'}`}>
                        {(data as any).hitsTrend >= 0 ? '+' : ''}{(data as any).hitsTrend}%
                    </h3>
                </div>
            </div>

            {/* Growth Chart (Time Series) */}
            <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <h4 className="font-black text-lg text-slate-800 dark:text-white mb-8 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">monitoring</span>
                    Traffic Growth (Daily Screen Time)
                </h4>
                <div className="h-64 flex items-end gap-1 md:gap-3 px-2">
                    {loading ? (
                        <div className="w-full flex items-center justify-center text-slate-300 font-bold uppercase tracking-widest">Crunching Numbers...</div>
                    ) : dailyChart.length === 0 ? (
                        <div className="w-full flex items-center justify-center text-slate-300 font-bold">Data collection in progress...</div>
                    ) : (
                        dailyChart.map((day, i) => (
                            <div key={i} className="group relative flex-1 flex flex-col items-center">
                                <div
                                    className="w-full bg-blue-100 dark:bg-slate-800 rounded-t-lg transition-all hover:bg-primary/20 cursor-pointer overflow-hidden border-x border-t border-transparent hover:border-primary/30"
                                    style={{ height: `${(day.hits / maxDailyHits) * 100}%`, minHeight: '4px' }}
                                >
                                    <div className="w-full h-full bg-gradient-to-t from-primary/10 to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <div className="absolute -top-10 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-all scale-75 group-hover:scale-100">
                                    {day.hits} hits
                                </div>
                                <span className="text-[10px] font-black text-slate-400 mt-2 truncate w-full text-center">
                                    {new Date(day.date).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Top performing pages */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 dark:border-slate-800">
                    <h4 className="font-black text-lg text-slate-800 dark:text-white">Page Performance Breakdown</h4>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] uppercase font-black tracking-widest text-slate-500">
                            <tr>
                                <th className="px-8 py-4">URL Path</th>
                                <th className="px-8 py-4">Total Hits</th>
                                <th className="px-8 py-4">Last Interactive</th>
                                <th className="px-8 py-4 text-right">Market Share</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
                            {data.visitors.map((v) => (
                                <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-8 py-5 text-sm font-black text-slate-700 dark:text-slate-300">{v.path}</td>
                                    <td className="px-8 py-5 text-sm font-black text-primary">{v.hits.toLocaleString()}</td>
                                    <td className="px-8 py-5 text-xs font-bold text-slate-400">{new Date(v.updatedAt).toLocaleString()}</td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center justify-end gap-3">
                                            <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-400 to-primary rounded-full"
                                                    style={{ width: `${(v.hits / totalHits) * 100}%` }}
                                                ></div>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-400 min-w-[30px]">{Math.round((v.hits / totalHits) * 100)}%</span>
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
