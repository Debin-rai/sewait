"use client";

import React from "react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Admin Settings</h2>
                    <p className="text-slate-500 mt-1">Configure your application behavior, security, and external integrations.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm">
                        Discard
                    </button>
                    <button className="px-5 py-2.5 bg-primary text-white font-bold rounded-lg hover:bg-slate-800 transition-all shadow-md flex items-center gap-2">
                        <span className="material-symbols-outlined text-sm">save</span>
                        Save All Changes
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Section: General App Settings */}
                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">tune</span>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">General App Settings</h3>
                            <p className="text-xs text-slate-500">Enable or disable core application modules</p>
                        </div>
                    </div>
                    <div className="space-y-1">
                        {[
                            { label: "Weather Module", desc: "Display real-time weather updates to users", checked: true },
                            { label: "NEPSE (Stock Market)", desc: "Show latest Nepal Stock Exchange data", checked: true },
                            { label: "News Feed", desc: "Aggregate local and international news stories", checked: false },
                            { label: "Currency Converter", desc: "Allow users to convert foreign currencies to NPR", checked: true }
                        ].map((item, idx) => (
                            <React.Fragment key={idx}>
                                <label className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors cursor-pointer group">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-800 dark:text-slate-200">{item.label}</span>
                                        <span className="text-xs text-slate-500">{item.desc}</span>
                                    </div>
                                    <div className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </div>
                                </label>
                                {idx < 3 && <div className="h-px bg-slate-100 dark:bg-slate-800 mx-3"></div>}
                            </React.Fragment>
                        ))}
                    </div>
                </section>

                {/* Section: API Configurations */}
                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">api</span>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">API Configurations</h3>
                            <p className="text-xs text-slate-500">Manage external service credentials</p>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                                OpenWeatherMap API Key
                                <span className="text-[10px] text-green-600 font-bold uppercase tracking-widest bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">Connected</span>
                            </label>
                            <div className="relative">
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" type="password" defaultValue="••••••••••••••••••••••••" />
                                <button className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-outlined text-[20px]">visibility</span>
                                </button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                                NEPSE Scraper Endpoints
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-slate-50 dark:bg-slate-800 px-2 py-0.5 rounded">Optional</span>
                            </label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" type="text" defaultValue="https://api.nepse.com.np/v2/latest" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">SMS Gateway Secret Key</label>
                            <div className="relative">
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" type="password" defaultValue="••••••••••••••••••••••••" />
                                <button className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600">
                                    <span className="material-symbols-outlined text-[20px]">visibility_off</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Security & Authentication */}
                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">security</span>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Security & Authentication</h3>
                            <p className="text-xs text-slate-500">Protect the admin portal and user accounts</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-dashed border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">Two-Factor Authentication (2FA)</h4>
                                    <p className="text-xs text-slate-500">Add an extra layer of security to admin accounts</p>
                                </div>
                                <span className="px-2 py-1 bg-amber-50 dark:bg-amber-900/20 text-amber-600 text-[10px] font-bold rounded uppercase">Recommended</span>
                            </div>
                            <button className="w-full py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors">
                                Set Up 2FA Now
                            </button>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Session Timeout</label>
                                <select className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white">
                                    <option>15 Minutes</option>
                                    <option defaultValue="30 Minutes">30 Minutes</option>
                                    <option>1 Hour</option>
                                    <option>4 Hours</option>
                                </select>
                            </div>
                            <div className="space-y-2 flex flex-col justify-end">
                                <button className="w-full py-2.5 border border-primary text-primary dark:text-blue-400 text-sm font-bold rounded-lg hover:bg-primary/5 transition-colors">
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Section: Backup & Logs */}
                <section className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">storage</span>
                            <div>
                                <h3 className="font-bold text-lg text-slate-900 dark:text-white">Backup & Logs</h3>
                                <p className="text-xs text-slate-500">System maintenance and activity tracking</p>
                            </div>
                        </div>
                        <div className="flex gap-3 mb-8">
                            <button className="flex-1 flex flex-col items-center justify-center p-4 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-xl hover:bg-amber-100 dark:hover:bg-amber-900/20 transition-all group">
                                <span className="material-symbols-outlined text-amber-600 mb-2 group-hover:scale-110 transition-transform">cloud_download</span>
                                <span className="text-sm font-bold text-amber-700 dark:text-amber-500">Manual Backup</span>
                                <span className="text-[10px] text-amber-600/70 mt-1">Last: 2 hrs ago</span>
                            </button>
                            <button className="flex-1 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-750 transition-all group">
                                <span className="material-symbols-outlined text-slate-500 mb-2 group-hover:scale-110 transition-transform">mop</span>
                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Clear Cache</span>
                                <span className="text-[10px] text-slate-400 mt-1">45.2 MB cached</span>
                            </button>
                        </div>
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 px-1">Recent Admin Activity</h4>
                        <div className="space-y-4">
                            {[
                                { user: "Admin Samip", action: "updated NEPSE API endpoints", time: "14 minutes ago", ip: "192.168.1.1", icon: "edit" },
                                { user: "System", action: "automatically performed database backup", time: "2 hours ago", ip: "Automated Task", icon: "backup" },
                                { user: "Admin Rohan", action: "disabled News Feed module", time: "5 hours ago", ip: "103.1.25.42", icon: "settings" }
                            ].map((activity, idx) => (
                                <div key={idx} className="flex gap-4 items-start">
                                    <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                                        <span className="material-symbols-outlined text-[18px] text-slate-500">{activity.icon}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-800 dark:text-slate-200"><span className="font-bold">{activity.user}</span> {activity.action}</p>
                                        <p className="text-[11px] text-slate-400 font-medium">{activity.time} • IP: {activity.ip}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-6 py-2 text-xs font-bold text-primary dark:text-blue-400 hover:underline flex items-center justify-center gap-1">
                            View Full Audit Log
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </section>

                {/* Section: Government Services Guides */}
                <section className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="material-symbols-outlined text-primary bg-primary/10 p-2 rounded-lg">account_balance</span>
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 dark:text-white">Government Services Guides</h3>
                            <p className="text-xs text-slate-500">Manage citizen service guides and documentation</p>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <label className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer group">
                            <div className="flex flex-col">
                                <span className="font-semibold text-slate-800 dark:text-slate-200">Enable Module</span>
                                <span className="text-xs text-slate-500">Show government guides in the user app</span>
                            </div>
                            <div className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" defaultChecked className="sr-only peer" />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                            </div>
                        </label>
                        <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Featured Guides Count</label>
                                <input className="w-full bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:ring-primary focus:border-primary transition-all text-slate-900 dark:text-white" max="10" min="1" type="number" defaultValue="4" />
                            </div>
                            <div className="space-y-2 flex flex-col justify-end">
                                <button className="w-full py-2.5 border border-primary text-primary dark:text-blue-400 text-sm font-bold rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                                    Manage Guides
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
