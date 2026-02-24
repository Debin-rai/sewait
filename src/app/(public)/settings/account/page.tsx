"use client";

import React, { useState, useEffect } from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function AccountSettings() {
    const { theme } = useTheme();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
    });

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    setFormData({
                        name: data.user.name || "",
                        email: data.user.email || "",
                    });
                }
                setLoading(false);
            });
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        // Implement save logic here
        setTimeout(() => {
            alert("Profile updated successfully!");
            setSaving(false);
        }, 1000);
    };

    if (loading) return (
        <div className="flex items-center justify-center h-64">
            <div className="size-8 border-4 border-slate-100 border-t-primary rounded-full animate-spin" style={{ borderTopColor: THEMES[theme].primary }}></div>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="mb-10">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Account Settings</h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Manage your public profile and account details.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-sm">
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary" style={{ color: THEMES[theme].primary }}>person</span>
                        <h3 className="font-bold text-slate-900 dark:text-white">Profile Information</h3>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="flex flex-col md:flex-row gap-8 items-start">
                            <div className="relative group">
                                <div 
                                    className="size-24 rounded-[2rem] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-3xl font-bold border-2 border-dashed border-slate-200 dark:border-slate-700 transition-all group-hover:border-primary/50"
                                    style={{ color: THEMES[theme].primary }}
                                >
                                    {formData.name?.[0] || formData.email?.[0]?.toUpperCase()}
                                </div>
                                <button type="button" className="absolute -bottom-2 -right-2 size-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-primary transition-all">
                                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                                </button>
                            </div>
                            <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                                    <input 
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 text-sm font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                    <input 
                                        type="email"
                                        value={formData.email}
                                        disabled
                                        className="w-full bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3 text-sm font-bold text-slate-400 cursor-not-allowed outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="flex justify-end gap-4">
                    <button type="button" className="px-8 py-3 rounded-2xl text-sm font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">Discard</button>
                    <button 
                        type="submit" 
                        disabled={saving}
                        className="px-10 py-3 bg-primary text-white rounded-2xl text-sm font-bold shadow-xl shadow-primary/20 transition-all active:scale-95 disabled:opacity-50"
                        style={{ backgroundColor: THEMES[theme].primary }}
                    >
                        {saving ? 'Saving...' : 'Save Profile'}
                    </button>
                </div>
            </form>
        </div>
    );
}
