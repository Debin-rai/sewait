"use client";

import React from "react";

const logs = [
    {
        date: "Oct 24, 2023",
        time: "14:20:45",
        admin: "Abhishek Sharma",
        role: "Super Admin",
        action: "Updated Gold Rate",
        details: "Changed 24K rate from 110,000 to 112,500 NPR",
        ip: "192.168.1.45",
        status: "Success",
        icon: "trending_up",
        color: "text-primary",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBocWihOv9d_HzKpNdHKjVBlGhtswn50HM9EyjkcNTcT8VWej9pokoNrQolEZEI6HmJjYWbWwOn5H5SUU0mnW1VgrbUNWq4T_bXPVdcHYpQnO8weeFQDaKbAgZxD9tT1CVUiGmcXlFCSjqHYFfGe8xJqKBXBe-SglH370LRWfYPMLtS4r1VXkiVEZ8iIpLSE8FiUXgzUdbFmsqUUEfcoUvTRJKC3bkVUGUL30YR4_wi4fNRas2kGZLl8ZossVDTurw_iA0a3DswHa8"
    },
    {
        date: "Oct 24, 2023",
        time: "13:55:12",
        admin: "Rita Neupane",
        role: "Security Manager",
        action: "Deleted User Account",
        details: "UID: user_88291 (Suspicious activity)",
        ip: "103.24.190.11",
        status: "Success",
        icon: "person_remove",
        color: "text-red-600",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuBq_OA-65sztpNXgsSHZTo02kMfE8YqLj4GeAmULSiWovSORGg1j-uAKNln4TiuXIZt7vdH4CVJWseJ418QUme-hWeqFkRCHO1jKbC3bmWlBQMHfc0-jjhOXHlxk7uIiU07KEQc5SQVzRFBhd_6tho38nVRu8LHuGv3uzZ4gq2qxN4WwMJrsuzjc0VNft9sqMQCMVeonfsiQICRPYZm4NfxKfu_L61_ty9lYzl0uGGW1aEvR_VzbTt1GWdVb_kV7FyXaF7Od1YAL8E"
    },
    {
        date: "Oct 24, 2023",
        time: "12:10:04",
        admin: "Krishna Poudel",
        role: "Junior Admin",
        action: "Failed Login Attempt",
        details: "3 consecutive failures from this IP",
        ip: "45.201.2.33",
        status: "Failed",
        icon: "login",
        color: "text-orange-600",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDJESSTMfn_KWl_P1yY-RCtR03jGmEDRgXP1STH2deDx7oPWIzyeoIUeg4nqmzxmNR2izbzKBuQievuqoQOTK6GgjHCqgtiPo8VB3lF9qckGlfVHrbEcFqAKBamOPPAaTHz2k062352rjkydBL1Xo7xCUvXH-XuWonK230oYr5HjPgITYHrf8-7gbbmibxl1zt6paDbo75YeqWgCFJQukyhXCbdZtb0hEOxLFo9PknqBfm4vRffW-QwlvS518yFlX_LWxM1zk7xdKk"
    },
    {
        date: "Oct 24, 2023",
        time: "11:42:30",
        admin: "System Process",
        role: "Automated",
        action: "Backup Completed",
        details: "Full daily database backup (4.2 GB)",
        ip: "internal-vpc",
        status: "Info",
        icon: "settings_backup_restore",
        color: "text-blue-600",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuC9RW05xBwFpDyRkI7trQ6fYXf5PpnL6rnYlEiFJb41d4wOGplfQ3D9NXwGS7YIJBK562wF3hzsdEpVoD-hWg38pfW0uTb-jzKf7sS6GiEECtt07_PU0g1iBk-mzMIPdcVOfT7tRkpyYyLUJVbsKWV3mHdDjMj0hkEviTHPM4GqwHUqbO5LaENHj_gQ2sj_gNUHPJH4WhDDQeQRHLFGHkVi6jve0LoudioNizcQ1gO39xkG4c07SX_Dt3YJyzLvkOq8-hsp3wmS0PY"
    },
    {
        date: "Oct 24, 2023",
        time: "09:15:22",
        admin: "Abhishek Sharma",
        role: "Super Admin",
        action: "Enabled 2FA Enforcement",
        details: "Applied to all 'Merchant' role users",
        ip: "192.168.1.45",
        status: "Success",
        icon: "security",
        color: "text-primary",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuA1vQSsvaB9rbtNZANXaDqSzsy_Fc4n69Da-zs6JRwIkNGvunhF4fU66SfZeDYhaHRfJxZj9CpIlrnBhx3391gDS2knCzz7ICMQAFZFkATr-qV1YCZlH0E46s9iJvk9Wt0REJ7PHRfXeBog2hL7Y0GGO7hVXQp1VLUg9KT3ZMFsBknVCU9coyS2rvn5TOtx8R0kphM64Q_KEOvZw0BBlFn7VPQgTlDROwvrhGPEse6ZW60efFZTe95vr28tnWck1MWMGLvZnd-ll8g"
    }
];

export default function SystemLogsPage() {
    return (
        <div className="flex flex-col h-full animate-in fade-in duration-500">
            {/* Header Section */}
            <header className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-8 py-6 flex-shrink-0 mb-6 shadow-sm">
                <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">System Audit Logs</h2>
                        <p className="text-slate-500 text-base mt-1">Monitor administrative activity and security events across the platform</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700">
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Logs Today</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold text-primary dark:text-blue-400">1,284</span>
                                    <span className="text-[11px] font-bold text-green-600">+12%</span>
                                </div>
                            </div>
                            <div className="w-px h-8 bg-slate-200 dark:bg-slate-700"></div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Security Alerts</p>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-xl font-bold text-red-600">12</span>
                                    <span className="text-[11px] font-bold text-red-500">-5%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Filters Section */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-8 py-4 flex-shrink-0 flex items-center justify-between gap-4 mb-6 shadow-sm">
                <div className="flex items-center gap-3 flex-1 max-w-2xl">
                    <div className="relative flex-1">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">search</span>
                        <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-primary focus:border-primary text-slate-900 dark:text-white" placeholder="Search by Admin, Action, or IP..." type="text" />
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-750">
                            <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                            <span>Date Range</span>
                            <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-750">
                            <span className="material-symbols-outlined text-[18px]">filter_list</span>
                            <span>Action Type</span>
                            <span className="material-symbols-outlined text-[16px]">expand_more</span>
                        </button>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-bold text-primary dark:text-blue-400 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">Clear Filters</button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg text-sm font-bold hover:bg-slate-200 dark:hover:bg-slate-750">
                        <span className="material-symbols-outlined text-[18px]">csv</span>
                        <span>Download CSV</span>
                    </button>
                </div>
            </div>

            {/* Table Section */}
            <div className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto h-full">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-primary text-white sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Timestamp</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Admin User</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest">Action</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-center">IP Address</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {logs.map((log, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group text-slate-900 dark:text-white">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <div className="font-medium">{log.date}</div>
                                        <div className="text-xs text-slate-500">{log.time}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-xs overflow-hidden">
                                                <img src={log.avatar} alt={log.admin} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold">{log.admin}</div>
                                                <div className="text-xs text-slate-500">{log.role}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`material-symbols-outlined text-[18px] ${log.color}`}>{log.icon}</span>
                                            <span className="text-sm font-medium">{log.action}</span>
                                        </div>
                                        <div className="text-xs text-slate-500 mt-0.5">{log.details}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-center">
                                        <code className={`text-xs font-mono px-2 py-1 rounded ${log.status === 'Failed' ? 'bg-red-50 dark:bg-red-900/20 text-red-600 border border-red-100 dark:border-red-900/40 font-bold' : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}>
                                            {log.ip}
                                        </code>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${log.status === 'Success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700 border-green-200 dark:border-green-900/40' :
                                                log.status === 'Failed' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 border-red-200 dark:border-red-900/40' :
                                                    'bg-blue-50 dark:bg-blue-900/20 text-blue-700 border-blue-200 dark:border-blue-900/40'
                                            }`}>
                                            <span className={`size-1.5 rounded-full ${log.status === 'Success' ? 'bg-green-500' :
                                                    log.status === 'Failed' ? 'bg-red-500' :
                                                        'bg-blue-500'
                                                }`}></span>
                                            {log.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex items-center justify-between flex-shrink-0">
                <p className="text-sm text-slate-500">
                    Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">5</span> of <span className="font-bold text-slate-900 dark:text-white">1,284</span> entries
                </p>
                <div className="flex items-center gap-2">
                    <button className="size-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 disabled:opacity-50" disabled>
                        <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <button className="size-9 flex items-center justify-center bg-primary text-white rounded-lg font-bold text-sm">1</button>
                    <button className="size-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850">2</button>
                    <button className="size-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850">3</button>
                    <span className="px-1 text-slate-400">...</span>
                    <button className="size-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-sm font-medium text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-850">129</button>
                    <button className="size-9 flex items-center justify-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850">
                        <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
