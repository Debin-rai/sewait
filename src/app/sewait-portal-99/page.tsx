"use client";

import { useState, useEffect } from "react";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        dau: 0,
        totalUniques: 0,
        hitsTrend: 0,
        articleCount: 0,
        status: "Healthy",
        recentLogs: [] as any[]
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch("/api/sewait-portal-99/analytics");
                const data = await res.json();
                if (data.dau !== undefined) {
                    setStats({
                        dau: data.dau,
                        totalUniques: data.totalUniques,
                        hitsTrend: data.hitsTrend,
                        articleCount: data.articleCount,
                        status: "Healthy",
                        recentLogs: data.recentLogs || []
                    });
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const formatRelativeTime = (dateString: string) => {
        const now = new Date();
        const past = new Date(dateString);
        const diffInMs = now.getTime() - past.getTime();
        const diffInMins = Math.floor(diffInMs / (1000 * 60));
        const diffInHours = Math.floor(diffInMins / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMins < 1) return "Just now";
        if (diffInMins < 60) return `${diffInMins} min${diffInMins > 1 ? 's' : ''} ago`;
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
                <p className="text-slate-500 text-sm">Real-time system health and user engagement metrics.</p>
            </div>

            {/* Stat Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Daily Users (DAU) */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Daily Active Users</p>
                            <h3 className="text-3xl font-bold mt-1 text-[#1a355b] dark:text-blue-400">
                                {loading ? "..." : stats.dau.toLocaleString()}
                            </h3>
                        </div>
                        <div className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5 ${stats.hitsTrend >= 0 ? "bg-[#10b981]/10 text-[#10b981]" : "bg-red-100 text-red-600"}`}>
                            <span className="material-symbols-outlined text-xs">{stats.hitsTrend >= 0 ? "trending_up" : "trending_down"}</span> {Math.abs(stats.hitsTrend)}%
                        </div>
                    </div>
                    <div className="h-10 w-full flex items-end gap-1 px-1">
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-2/3"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/3"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-4/5"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-[#1a355b] rounded-t h-full"></div>
                    </div>
                </div>

                {/* Total Unique Visitors */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Reach</p>
                            <h3 className="text-3xl font-bold mt-1">
                                {loading ? "..." : stats.totalUniques.toLocaleString()}
                            </h3>
                        </div>
                        <div className="bg-[#10b981]/10 text-[#10b981] px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">trending_up</span> Live
                        </div>
                    </div>
                    <div className="h-10 w-full flex items-end gap-1 px-1">
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-2/3"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-3/4"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-2/3"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-5/6"></div>
                        <div className="flex-1 bg-[#1a355b] rounded-t h-3/4"></div>
                    </div>
                </div>

                {/* Articles Posted */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Content Assets</p>
                            <h3 className="text-3xl font-bold mt-1">{loading ? "..." : stats.articleCount}</h3>
                        </div>
                        <div className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">horizontal_rule</span> Total
                        </div>
                    </div>
                    <div className="h-10 w-full flex items-end gap-1 px-1">
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-[#1a355b]/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-[#1a355b] rounded-t h-1/2"></div>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">System Health</p>
                            <h3 className="text-3xl font-bold mt-1 text-[#10b981]">{stats.status}</h3>
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">check_circle</span> Online
                        </div>
                    </div>
                    <div className="h-10 w-full flex items-center gap-1 px-1 bg-slate-50 dark:bg-slate-800/50 rounded p-1">
                        <div className="h-full w-full bg-gradient-to-r from-[#10b981]/20 via-[#10b981] to-[#10b981]/20 rounded-full animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Recent Updates Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky left-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity & Logs</h3>
                    <div className="flex gap-2">
                        <button className="text-sm font-semibold text-[#1a355b] hover:bg-[#1a355b]/5 px-3 py-1.5 rounded-lg transition-colors">Export CSV</button>
                        <button className="text-sm font-semibold bg-[#1a355b] text-white px-4 py-1.5 rounded-lg hover:bg-[#1a355b]/90 transition-colors shadow-sm">View All</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Admin</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Action</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-bold uppercase tracking-widest">
                                        Loading activity stream...
                                    </td>
                                </tr>
                            ) : stats.recentLogs.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                                        No recent activity recorded.
                                    </td>
                                </tr>
                            ) : stats.recentLogs.map((log, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded bg-[#1a355b]/10 text-[#1a355b] flex items-center justify-center font-bold text-[10px] uppercase">
                                                {log.admin?.name?.substring(0, 2) || "AD"}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    {log.admin?.name || "System"}
                                                </span>
                                                <span className="text-[10px] text-slate-500 uppercase">{log.admin?.role || "System"}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-[#1a355b] dark:text-blue-400 uppercase tracking-tight">{log.action}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">{log.details}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{formatRelativeTime(log.createdAt)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${log.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-[#1a355b]"><span className="material-symbols-outlined">more_vert</span></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
                <div className="bg-[#1a355b] text-white p-8 rounded-xl shadow-lg relative overflow-hidden group">
                    <div className="relative z-10 flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <h4 className="text-white/60 text-sm font-medium tracking-wide uppercase">System Uptime</h4>
                            <p className="text-4xl font-black">99.98%</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <p className="text-xs text-white/60">Server Load</p>
                                <p className="text-lg font-bold">14.2%</p>
                            </div>
                            <div className="bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                                <p className="text-xs text-white/60">Active Threads</p>
                                <p className="text-lg font-bold">1,024</p>
                            </div>
                        </div>
                    </div>
                    <span className="material-symbols-outlined absolute -bottom-10 -right-10 text-[200px] text-white/5 rotate-12 transition-transform group-hover:rotate-0 duration-700">dns</span>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-xl flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                        <div className="flex flex-col gap-1">
                            <h4 className="text-slate-900 dark:text-white text-lg font-bold">Pending Approvals</h4>
                            <p className="text-slate-500 text-sm">You have 12 items waiting for review.</p>
                        </div>
                        <span className="material-symbols-outlined text-[#1a355b] bg-[#1a355b]/10 p-2 rounded-lg">pending_actions</span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div className="bg-[#1a355b] h-2 rounded-full w-[65%]"></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            <span>65% Processed</span>
                            <span>12 Remaining</span>
                        </div>
                        <button className="w-full mt-4 py-3 border-2 border-[#1a355b] text-[#1a355b] font-bold rounded-lg hover:bg-[#1a355b] hover:text-white transition-all">Review Submissions</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
