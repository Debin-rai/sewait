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

export default function AdsManagementPage() {
    const [loading, setLoading] = useState(false);
    const [ads, setAds] = useState<any[]>([]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Form State
    const [selectedPage, setSelectedPage] = useState("HOME");
    const [formData, setFormData] = useState({
        name: "",
        client: "",
        position: "",
        imageUrl: "",
        link: "",
        startDate: "",
        endDate: "",
    });

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);

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

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const data = new FormData();
        data.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            if (result.url) {
                setFormData(prev => ({ ...prev, imageUrl: result.url }));
            } else {
                alert("Upload failed");
            }
        } catch (err) {
            console.error(err);
            alert("Upload error");
        } finally {
            setUploading(false);
        }
    };

    const handleCreateAd = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/ads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                setIsCreateModalOpen(false);
                fetchAds();
                setFormData({ name: "", client: "", position: "", imageUrl: "", link: "", startDate: "", endDate: "" });
            }
        } catch (error) {
            console.error("Failed to create ad", error);
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
            <header className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-black text-primary dark:text-blue-400 tracking-tight">Campaign Center 2.0</h2>
                    <p className="text-slate-500 font-medium">Advanced granular control over ad placements.</p>
                </div>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-black text-sm shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                    <span className="material-symbols-outlined text-xl">add_circle</span>
                    Launch Campaign
                </button>
            </header>

            {/* Ads List Table (Existing code structure) */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-widest text-slate-500">
                            <tr>
                                <th className="px-8 py-4">Campaign</th>
                                <th className="px-8 py-4">Position</th>
                                <th className="px-8 py-4">Status</th>
                                <th className="px-8 py-4 text-right">Control</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {ads.map((ad) => (
                                <tr key={ad.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="size-14 rounded-xl bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden shadow-inner">
                                                <img src={ad.imageUrl} alt={ad.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800 dark:text-white leading-tight">{ad.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium truncate max-w-[150px]">{ad.client || 'Direct Client'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-[10px] font-bold uppercase">{ad.position.replace('_', ' ')}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ad.status === 'ACTIVE' ? 'bg-[#07883b]/10 text-[#07883b]' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                            {ad.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button onClick={() => handleDelete(ad.id, ad.name)} className="p-2 hover:bg-red-50 text-red-500 rounded-xl transition-all">
                                            <span className="material-symbols-outlined">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* NEW Create Ad Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300 max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
                            <div>
                                <h3 className="text-xl font-black text-slate-800 dark:text-white leading-tight">Create New Campaign</h3>
                                <p className="text-xs text-slate-500 font-medium">Step 1: Select Page & Position — Step 2: Upload Creative</p>
                            </div>
                            <button onClick={() => setIsCreateModalOpen(false)} className="size-8 flex items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
                                <span className="material-symbols-outlined text-slate-500">close</span>
                            </button>
                        </div>

                        <form onSubmit={handleCreateAd} className="p-8 space-y-8 overflow-y-auto custom-scrollbar">

                            {/* 1. Placement Selection */}
                            <section className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary text-white size-6 flex items-center justify-center rounded-full text-xs font-bold">1</span>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-white">Target Placement</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Page Selector */}
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Target Page</label>
                                        <select
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                            value={selectedPage}
                                            onChange={(e) => {
                                                setSelectedPage(e.target.value);
                                                setFormData(prev => ({ ...prev, position: "" })); // Reset position on page change
                                            }}
                                        >
                                            <option value="HOME">Home Page</option>
                                            <option value="CALENDAR">Calendar</option>
                                            <option value="NEPSE">NEPSE Market</option>
                                            <option value="GOLD_SILVER">Gold & Silver</option>
                                            <option value="SERVICES">Gov Services</option>
                                            <option value="WEATHER">Weather</option>
                                        </select>
                                    </div>

                                    {/* Position Selector (Dynamic) */}
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Available Positions</label>
                                        <div className="grid grid-cols-2 gap-3">
                                            {PLACEMENT_CATEGORIES[selectedPage as keyof typeof PLACEMENT_CATEGORIES]?.map((pos) => (
                                                <div
                                                    key={pos.id}
                                                    onClick={() => setFormData({ ...formData, position: pos.id })}
                                                    className={`p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.position === pos.id
                                                            ? 'border-primary bg-primary/5 shadow-md shadow-primary/10 scale-[1.02]'
                                                            : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                                                        }`}
                                                >
                                                    <p className="font-bold text-xs text-slate-800 dark:text-white">{pos.name}</p>
                                                    <p className="text-[9px] text-slate-400 mt-1 font-black uppercase">Size: {pos.size}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 2. Creative Upload */}
                            <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary text-white size-6 flex items-center justify-center rounded-full text-xs font-bold">2</span>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-white">Creative Asset</h4>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div
                                        className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center text-center transition-all cursor-pointer ${formData.imageUrl ? 'border-green-400 bg-green-50/10' : 'border-slate-200 dark:border-slate-700 hover:border-primary/50'
                                            }`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            onChange={handleFileUpload}
                                            accept="image/*"
                                        />
                                        {uploading ? (
                                            <p className="text-xs font-bold text-primary animate-pulse">Uploading...</p>
                                        ) : formData.imageUrl ? (
                                            <>
                                                <img src={formData.imageUrl} alt="Preview" className="h-24 object-contain mb-2 rounded shadow-sm" />
                                                <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider">Upload Complete</p>
                                                <p className="text-[9px] text-slate-400">(Click to change)</p>
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">cloud_upload</span>
                                                <p className="text-xs font-bold text-slate-500">Click to Upload Image</p>
                                                <p className="text-[9px] text-slate-400 mt-1">Supports JPG, PNG, WEBP</p>
                                            </>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Link Destination</label>
                                            <input
                                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                                placeholder="https://"
                                                value={formData.link}
                                                onChange={e => setFormData({ ...formData, link: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Campaign Name</label>
                                            <input
                                                required
                                                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                                placeholder="Internal Reference Name"
                                                value={formData.name}
                                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* 3. Scheduling */}
                            <section className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-primary text-white size-6 flex items-center justify-center rounded-full text-xs font-bold">3</span>
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-slate-800 dark:text-white">Schedule</h4>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Start Date</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                            value={formData.startDate}
                                            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">End Date</label>
                                        <input
                                            type="date"
                                            className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl border-none focus:ring-2 focus:ring-primary/20 outline-none text-sm font-bold"
                                            value={formData.endDate}
                                            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </section>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={loading || !formData.imageUrl || !formData.position}
                                    className="w-full py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Launch Campaign'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
