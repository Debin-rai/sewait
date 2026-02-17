"use client";

export default function AdminDashboard() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Dashboard Overview</h2>
                <p className="text-slate-500 text-sm">Real-time system health and user engagement metrics.</p>
            </div>

            {/* Stat Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Daily Users */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Daily Users</p>
                            <h3 className="text-3xl font-bold mt-1">1,284</h3>
                        </div>
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">trending_up</span> 12.5%
                        </div>
                    </div>
                    <div className="h-10 w-full flex items-end gap-1 px-1">
                        <div className="flex-1 bg-primary/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-2/3"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-1/3"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-4/5"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-primary rounded-t h-full"></div>
                    </div>
                </div>

                {/* Total Reminders */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total Reminders</p>
                            <h3 className="text-3xl font-bold mt-1">45,201</h3>
                        </div>
                        <div className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">trending_up</span> 5.2%
                        </div>
                    </div>
                    <div className="h-10 w-full flex items-end gap-1 px-1">
                        <div className="flex-1 bg-primary/10 rounded-t h-2/3"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-3/4"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-2/3"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-5/6"></div>
                        <div className="flex-1 bg-primary rounded-t h-3/4"></div>
                    </div>
                </div>

                {/* Articles Posted */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Articles Posted</p>
                            <h3 className="text-3xl font-bold mt-1">128</h3>
                        </div>
                        <div className="bg-primary/10 text-primary dark:text-primary-light px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">horizontal_rule</span> Steady
                        </div>
                    </div>
                    <div className="h-10 w-full flex items-end gap-1 px-1">
                        <div className="flex-1 bg-primary/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-primary/10 rounded-t h-1/2"></div>
                        <div className="flex-1 bg-primary rounded-t h-1/2"></div>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">System Health</p>
                            <h3 className="text-3xl font-bold mt-1 text-emerald-600">Healthy</h3>
                        </div>
                        <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-xs">trending_down</span> 0.5% Latency
                        </div>
                    </div>
                    <div className="h-10 w-full flex items-center gap-1 px-1 bg-slate-50 dark:bg-slate-800/50 rounded p-1">
                        <div className="h-full w-full bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 rounded-full"></div>
                    </div>
                </div>
            </div>

            {/* Recent Updates Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-white dark:bg-slate-900 sticky left-0">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Recent Updates & Alerts</h3>
                    <div className="flex gap-2">
                        <button className="text-sm font-semibold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-colors">Export CSV</button>
                        <button className="text-sm font-semibold bg-primary text-white px-4 py-1.5 rounded-lg hover:bg-primary/90 transition-colors shadow-sm">View All</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50">
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">User ID</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Activity Type</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Status</th>
                                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {[
                                { id: "#USR-8821", name: "RS", type: "Account Recovery Requested", time: "2 mins ago", status: "Pending", statusColor: "amber" },
                                { id: "#USR-9102", name: "MA", type: "New Content Submission", time: "14 mins ago", status: "Resolved", statusColor: "emerald" },
                                { id: "#ALERT-004", name: "SYS", type: "Database Connection Spike", time: "45 mins ago", status: "Critical", statusColor: "red", typeColor: "text-red-500 font-semibold" },
                                { id: "#USR-7732", name: "KT", type: "New Pro Subscription", time: "1 hour ago", status: "Processing", statusColor: "blue" },
                            ].map((row, i) => (
                                <tr key={i} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`size-8 rounded ${row.name === 'SYS' ? 'bg-red-100 text-red-600' : 'bg-primary/10 text-primary'} flex items-center justify-center font-bold text-xs`}>{row.name}</div>
                                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{row.id}</span>
                                        </div>
                                    </td>
                                    <td className={`px-6 py-4 text-sm ${row.typeColor || 'text-slate-600 dark:text-slate-400'}`}>{row.type}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{row.time}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-${row.statusColor}-100 dark:bg-${row.statusColor}-900/30 text-${row.statusColor}-600 dark:text-${row.statusColor}-400 ring-1 ring-${row.statusColor}-200 dark:ring-${row.statusColor}-800`}>{row.status}</span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-primary"><span className="material-symbols-outlined">more_vert</span></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Footer Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-12">
                <div className="bg-primary text-white p-8 rounded-xl shadow-lg relative overflow-hidden group">
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
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">pending_actions</span>
                    </div>
                    <div className="mt-6 flex flex-col gap-3">
                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
                            <div className="bg-primary h-2 rounded-full w-[65%]"></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-tighter">
                            <span>65% Processed</span>
                            <span>12 Remaining</span>
                        </div>
                        <button className="w-full mt-4 py-3 border-2 border-primary text-primary font-bold rounded-lg hover:bg-primary hover:text-white transition-all">Review Submissions</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
