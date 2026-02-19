"use client";

import { useState, useEffect } from "react";

const AnalyticsCard = ({
    title,
    value,
    metric,
    trend,
    trendIcon,
    colorClass,
    lightColorClass,
    loading: parentLoading
}: {
    title: string,
    value: string | number,
    metric: string,
    trend?: string | number,
    trendIcon?: string,
    colorClass: string,
    lightColorClass: string,
    loading: boolean
}) => {
    const [period, setPeriod] = useState("week");
    const [chartData, setChartData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showMenu, setShowMenu] = useState(false);
    const [selectedBar, setSelectedBar] = useState<any>(null);

    useEffect(() => {
        const fetchCardData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`/api/sewait-portal-99/analytics?period=${period}`);
                const data = await res.json();
                setChartData(data.chart || []);
            } catch (error) {
                console.error(`Failed to fetch ${title} stats`, error);
            } finally {
                setLoading(false);
            }
        };
        fetchCardData();
    }, [period]);

    const maxVal = Math.max(...chartData.map(d => d[metric]), 1);

    return (
        <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4 relative">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{title}</p>
                    <h3 className={`text-3xl font-bold mt-1 ${colorClass}`}>
                        {parentLoading ? "..." : value.toLocaleString()}
                    </h3>
                </div>
                <div className="relative">
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors text-slate-400"
                    >
                        <span className="material-symbols-outlined text-lg">more_vert</span>
                    </button>
                    {showMenu && (
                        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl z-20 overflow-hidden font-bold text-xs uppercase animate-in fade-in zoom-in duration-200">
                            {['week', 'month', 'year'].map((p) => (
                                <button
                                    key={p}
                                    onClick={() => { setPeriod(p); setShowMenu(false); }}
                                    className={`w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${period === p ? colorClass : 'text-slate-500'}`}
                                >
                                    {p}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Performance Trend */}
            {trend !== undefined && (
                <div className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5 self-start ${trendIcon === 'trending_up' ? "bg-[#10b981]/10 text-[#10b981]" : trendIcon === 'horizontal_rule' ? "bg-slate-100 text-slate-500" : "bg-red-100 text-red-600"}`}>
                    <span className="material-symbols-outlined text-xs">{trendIcon}</span> {typeof trend === 'number' ? `${Math.abs(trend)}%` : trend}
                </div>
            )}

            {/* Interactive Bar Chart */}
            <div className="flex flex-col gap-2 mt-2">
                <div className="h-16 w-full flex items-end gap-1 px-1">
                    {loading ? (
                        Array(period === 'week' ? 7 : period === 'month' ? 15 : 12).fill(0).map((_, i) => (
                            <div key={i} className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-t h-1/2 animate-pulse"></div>
                        ))
                    ) : (
                        chartData.map((d, i) => (
                            <button
                                key={i}
                                onClick={() => setSelectedBar(selectedBar?.date === d.date ? null : d)}
                                className={`flex-1 rounded-t transition-all duration-500 hover:scale-x-110 relative group ${selectedBar?.date === d.date ? colorClass.split(' ')[0].replace('text-', 'bg-') : i === chartData.length - 1 ? colorClass.split(' ')[0].replace('text-', 'bg-') : `${lightColorClass}`}`}
                                style={{ height: `${Math.max((d[metric] / maxVal) * 100, 5)}%` }}
                            >
                                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 pointer-events-none font-bold shadow-lg border border-white/10">
                                    {d.label}: {d[metric]}
                                </div>
                            </button>
                        ))
                    )}
                </div>

                {/* Labels (Only for Week view) */}
                {period === 'week' && !loading && (
                    <div className="flex justify-between px-1">
                        {chartData.map((d, i) => (
                            <div key={i} className="flex-1 text-center">
                                <span className="text-[8px] font-bold text-slate-400 uppercase leading-none block">{d.day}</span>
                                <span className="text-[7px] font-medium text-slate-300 block">{d.date.split('-')[2]}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Selection Popup */}
            {selectedBar && (
                <div className="absolute inset-x-4 bottom-4 bg-[#1a355b] dark:bg-blue-900 text-white p-3 rounded-lg shadow-2xl flex justify-between items-center animate-in slide-in-from-bottom-2 duration-300 z-40 border border-white/10">
                    <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-black text-white/60 tracking-widest">{selectedBar.fullDate}</span>
                        <span className="text-sm font-bold">{selectedBar[metric].toLocaleString()} {title}</span>
                    </div>
                    <button onClick={() => setSelectedBar(null)} className="text-white/60 hover:text-white">
                        <span className="material-symbols-outlined text-lg">close</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        dau: 0,
        totalUniques: 0,
        periodUniques: 0,
        hitsTrend: 0,
        articleCount: 0,
        status: "Healthy",
        recentLogs: [] as any[],
        chart: [] as any[] // Keeps the raw week view for initial summary if needed
    });
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/sewait-portal-99/analytics?period=week`);
            const data = await res.json();
            if (data.dau !== undefined) {
                setStats({
                    dau: data.dau,
                    totalUniques: data.totalUniques,
                    periodUniques: data.periodUniques,
                    hitsTrend: data.hitsTrend,
                    articleCount: data.articleCount,
                    status: "Healthy",
                    recentLogs: data.recentLogs || [],
                    chart: data.chart || []
                });
            }
        } catch (error) {
            console.error("Failed to fetch dashboard stats", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
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
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
                    <p className="text-slate-500 text-sm">Real-time system health and user engagement metrics.</p>
                </div>
            </div>

            {/* Stat Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <AnalyticsCard
                    title="Daily Active Users"
                    value={stats.dau}
                    metric="dau"
                    trend={stats.hitsTrend}
                    trendIcon={stats.hitsTrend >= 0 ? "trending_up" : "trending_down"}
                    colorClass="text-[#1a355b] dark:text-blue-400"
                    lightColorClass="bg-[#1a355b]/20 dark:bg-blue-500/20"
                    loading={loading}
                />
                <AnalyticsCard
                    title="Total Reach"
                    value={stats.periodUniques}
                    metric="hits"
                    trend="Live"
                    trendIcon="trending_up"
                    colorClass="text-emerald-500"
                    lightColorClass="bg-emerald-500/20"
                    loading={loading}
                />
                <AnalyticsCard
                    title="Content Assets"
                    value={stats.articleCount}
                    metric="content"
                    trend="Total"
                    trendIcon="horizontal_rule"
                    colorClass="text-[#1a355b]"
                    lightColorClass="bg-[#1a355b]/10"
                    loading={loading}
                />
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
                    <div className="mt-auto">
                        <div className="h-10 w-full flex items-center gap-1 px-1 bg-slate-50 dark:bg-slate-800/50 rounded p-1">
                            <div className="h-full w-full bg-gradient-to-r from-[#10b981]/20 via-[#10b981] to-[#10b981]/20 rounded-full animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Updates Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky left-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Activity &amp; Logs</h3>
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

