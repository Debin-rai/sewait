"use client";

import React, { useState, useEffect } from "react";

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(false);
    const [configs, setConfigs] = useState<any>({});
    const [logs, setLogs] = useState<any[]>([]);
    const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({});
    const [isExcluded, setIsExcluded] = useState(false);

    useEffect(() => {
        // Initialize exclusion state from cookie
        const checkExclusion = async () => {
            const { getCookie } = await import("@/lib/cookies");
            setIsExcluded(getCookie('sewait_exclude_analytics') === 'true');
        };
        checkExclusion();
    }, []);

    useEffect(() => {
        const timers: { [key: string]: NodeJS.Timeout } = {};
        Object.keys(showKeys).forEach(key => {
            if (showKeys[key]) {
                timers[key] = setTimeout(() => {
                    setShowKeys(prev => ({ ...prev, [key]: false }));
                }, 5000);
            }
        });
        return () => {
            Object.values(timers).forEach(clearTimeout);
        };
    }, [showKeys]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [cRes, lRes] = await Promise.all([
                fetch("/api/sewait-portal-99/config"),
                fetch("/api/sewait-portal-99/logs?limit=5")
            ]);
            setConfigs(await cRes.json());
            const logsData = await lRes.json();
            setLogs(Array.isArray(logsData) ? logsData : []);
        } catch (error) {
            console.error("Failed to fetch settings", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/config", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(configs),
            });
            if (res.ok) alert("Settings saved successfully!");
        } catch (error) {
            alert("Save failed");
        } finally {
            setLoading(false);
        }
    };

    const updateValue = (key: string, value: any) => {
        setConfigs({ ...configs, [key]: value });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">System Core</h2>
                    <p className="text-slate-500 font-medium tracking-tight">Configure core modules, API keys, and security parameters.</p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleSave}
                        disabled={loading}
                        className="px-6 py-3 bg-primary text-white font-black rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-primary/20 flex items-center gap-2 active:scale-95 disabled:opacity-50"
                    >
                        <span className="material-symbols-outlined text-lg">save</span>
                        {loading ? 'Processing...' : 'Apply Changes'}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Module Settings */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined font-black">tune</span>
                        </div>
                        <div>
                            <h3 className="font-black text-xl text-slate-800 dark:text-white">General Modules</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Toggle Functional Components</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                key: "MODULE_WEATHER",
                                label: "Weather Services",
                                desc: "Live temperature, status, sunrise/sunset",
                                icon: 'partly_cloudy_day',
                                color: 'text-amber-500',
                                info: "When ON, displays the live weather widget on the home page using OpenWeatherMap API."
                            },
                            {
                                key: "MODULE_SEWA_AI",
                                label: "Sewa AI Assistant",
                                desc: "Nepalese focused AI chatbot",
                                icon: 'smart_toy',
                                color: 'text-primary',
                                info: "When ON, enables the Sewa AI chat page and home teaser card."
                            },
                            {
                                key: "MODULE_GUIDES",
                                label: "Official Document AI",
                                desc: "SewaIT Document Generator",
                                icon: 'description',
                                color: 'text-blue-500',
                                info: "Enables/Disables the AI document generator and the assistant."
                            },
                            {
                                key: 'ENABLE_ADS',
                                label: 'Ads Management',
                                desc: 'Campaigns and Ad tracking',
                                icon: 'campaign',
                                color: 'text-purple-500',
                                info: "When ON, shows advertisement banners and slots across the public platform."
                            }
                        ].map((module) => (
                            <div key={module.key} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 group relative">
                                <div className="flex items-center gap-3">
                                    <div className={`size-10 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm ${module.color}`}>
                                        <span className="material-symbols-outlined">{module.icon}</span>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1.5">
                                            <p className="font-bold text-sm text-slate-700 dark:text-slate-200">{module.label}</p>
                                            <div className="group/tip relative flex items-center">
                                                <span className="material-symbols-outlined text-slate-300 hover:text-primary cursor-help text-sm">info</span>
                                                <div className="absolute left-full ml-2 w-48 p-3 bg-slate-800 text-white text-[10px] font-medium leading-relaxed rounded-xl opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl">
                                                    {module.info}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-[10px] text-slate-500 font-medium">{module.desc}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => updateValue(module.key, (configs[module.key] === 'false' || !configs[module.key]) ? 'true' : 'false')}
                                    className={`w-12 h-6 rounded-full transition-colors relative ${configs[module.key] !== 'false' ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'
                                        }`}
                                >
                                    <div className={`absolute top-1 left-1 size-4 bg-white rounded-full transition-transform ${configs[module.key] !== 'false' ? 'translate-x-6' : 'translate-x-0'
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Marquee Settings */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center text-amber-600">
                            <span className="material-symbols-outlined font-black">reorder</span>
                        </div>
                        <div>
                            <h3 className="font-black text-xl text-slate-800 dark:text-white">Marquee Control</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Homepage Document Scroller</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Document Titles (Comma Separated)</label>
                            <textarea
                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold min-h-[100px]"
                                value={configs.MARQUEE_ITEMS || ""}
                                onChange={e => updateValue("MARQUEE_ITEMS", e.target.value)}
                                placeholder="Letter, Character Certificate, ..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Scroll Speed (Pixels/sec)</label>
                            <div className="flex items-center gap-4">
                                <input
                                    className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                    type="number"
                                    value={configs.MARQUEE_SPEED || 30}
                                    onChange={e => updateValue("MARQUEE_SPEED", e.target.value)}
                                />
                                <span className="text-xs font-bold text-slate-400">High = Faster</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* API Keys */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-500">
                            <span className="material-symbols-outlined font-black">api</span>
                        </div>
                        <div>
                            <h3 className="font-black text-xl text-slate-800 dark:text-white">Service Connectors</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Manage External API Keys</p>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {[
                            { key: "API_WEATHER", label: "OpenWeatherMap Secret" },
                            { key: "API_SEWA_AI", label: "SewaIT AI API Key (DeepSeek/OpenRouter)" },
                            { key: "API_GITHUB", label: "GitHub Access Token" },
                            { key: "API_NOTIFICATION", label: "System Notification Gateway" },
                        ].map((field) => (
                            <div key={field.key} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{field.label}</label>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setShowKeys(prev => ({ ...prev, [field.key]: !prev[field.key] }))}
                                            className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
                                        >
                                            <span className="material-symbols-outlined text-xs">
                                                {showKeys[field.key] ? 'visibility_off' : 'visibility'}
                                            </span>
                                            {showKeys[field.key] ? 'Hide' : 'Show'}
                                        </button>
                                        <button className="text-[10px] font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1">
                                            <span className="material-symbols-outlined text-xs">edit</span>
                                            Update
                                        </button>
                                    </div>
                                </div>
                                <input
                                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                    type={showKeys[field.key] ? "text" : "password"}
                                    value={configs[field.key] || ""}
                                    onChange={e => updateValue(field.key, e.target.value)}
                                    placeholder="Enter API key or value..."
                                />
                            </div>
                        ))}
                    </div>
                </section>

                {/* Developer Preferences */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
                            <span className="material-symbols-outlined font-black">developer_mode</span>
                        </div>
                        <div>
                            <h3 className="font-black text-xl text-slate-800 dark:text-white">Developer Preferences</h3>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Internal Control</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800">
                            <div>
                                <p className="font-bold text-sm text-slate-700 dark:text-slate-200">Exclude My Device</p>
                                <p className="text-[10px] text-slate-500 font-medium">Stop tracking hits from this browser</p>
                            </div>
                            <button
                                onClick={async () => {
                                    const { setCookie } = await import("@/lib/cookies");
                                    const nextValue = !isExcluded;
                                    setCookie('sewait_exclude_analytics', String(nextValue), 365);
                                    setIsExcluded(nextValue);
                                    // Optional: reload to ensure all tracking stops immediately
                                    // window.location.reload(); 
                                }}
                                className={`w-12 h-6 rounded-full transition-colors relative cursor-pointer ${isExcluded ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'
                                    }`}
                            >
                                <div className={`absolute top-1 left-1 size-4 bg-white rounded-full transition-transform ${isExcluded ? 'translate-x-6' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </section>

                {/* System Logs */}
                <section className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm md:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="size-12 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-500">
                                <span className="material-symbols-outlined font-black">receipt_long</span>
                            </div>
                            <div>
                                <h3 className="font-black text-xl text-slate-800 dark:text-white">Live System Logs</h3>
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Audit Trail & Security Monitoring</p>
                            </div>
                        </div>
                        <button
                            onClick={fetchData}
                            className="text-xs font-black text-primary hover:underline uppercase tracking-widest"
                        >
                            Refresh Log
                        </button>
                    </div>

                    <div className="space-y-3">
                        {logs.length === 0 ? (
                            <p className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest text-xs">No activity recorded</p>
                        ) : logs.map((log) => (
                            <div key={log.id} className="p-4 bg-slate-50/50 dark:bg-slate-800/20 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center gap-4">
                                <div className="size-8 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-400 text-xs font-black">
                                    {log.action.split('_').map((w: string) => w[0]).join('').slice(0, 2)}
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-tighter">
                                        {log.admin} <span className="text-slate-400 font-medium italic">performed</span> {log.action}
                                    </p>
                                    <p className="text-[10px] text-slate-500 font-medium">{log.details}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-slate-400 uppercase">{new Date(log.createdAt).toLocaleTimeString()}</p>
                                    <p className="text-[9px] font-bold text-primary opacity-50">{log.ip || 'INTERNAL'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-center">
                        <a href="/sewait-portal-99/logs" className="px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-all">
                            View Complete Audit Log
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
}
