"use client";

import React, { useState, useEffect } from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function UserManagementPage() {
    const { theme } = useTheme();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);

    const fetchUsers = async () => {
        try {
            const res = await fetch("/api/sewait-portal-99/users");
            const data = await res.json();
            if (Array.isArray(data)) setUsers(data);
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleUpdateUser = async (userId: string, updates: any) => {
        setUpdating(userId);
        try {
            const res = await fetch("/api/sewait-portal-99/users", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, ...updates }),
            });
            if (res.ok) {
                await fetchUsers();
            } else {
                alert("Failed to update user");
            }
        } catch (err) {
            console.error(err);
            alert("Error updating user");
        } finally {
            setUpdating(null);
        }
    };

    const stats = {
        total: users.length,
        pro: users.filter(u => u.plan === 'PRO').length,
        business: users.filter(u => u.plan === 'BUSINESS').length,
        active: users.filter(u => u.status === 'ACTIVE').length,
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Page Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Intelligence User Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage user plans, AI unit limits, and account lifecycle.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={fetchUsers} className="p-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-500 hover:text-primary transition-all">
                        <span className={`material-symbols-outlined ${loading ? 'animate-spin' : ''}`}>refresh</span>
                    </button>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Identity</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Plan & Subscription</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">AI Units (Used/Limit)</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest animate-pulse">
                                        Synchronizing user registry...
                                    </td>
                                </tr>
                            ) : users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-20 text-center text-slate-400 italic">
                                        No users found in the system.
                                    </td>
                                </tr>
                            ) : users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group text-slate-900 dark:text-slate-100">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <div className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold border border-primary/10">
                                                {user.name?.[0] || user.email[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold">{user.name || 'Anonymous'}</p>
                                                <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <select 
                                            value={user.plan}
                                            onChange={(e) => handleUpdateUser(user.id, { plan: e.target.value })}
                                            disabled={updating === user.id}
                                            className={`bg-transparent text-xs font-bold px-3 py-1.5 rounded-lg border focus:ring-2 focus:ring-primary/20 outline-none transition-all ${
                                                user.plan === 'PRO' ? 'border-amber-200 text-amber-700 bg-amber-50' : 
                                                user.plan === 'BUSINESS' ? 'border-indigo-200 text-indigo-700 bg-indigo-50' : 
                                                'border-slate-200 text-slate-600'
                                            }`}
                                        >
                                            <option value="FREE">FREE CITIZEN</option>
                                            <option value="PRO">MONTHLY PRO</option>
                                            <option value="BUSINESS">BUSINESS/YEARLY</option>
                                        </select>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="flex justify-between items-center w-32">
                                                <span className="text-[10px] font-black text-slate-400">{user.aiUnitsUsedThisMonth} / {user.aiUnitsLimit}</span>
                                                <span className="text-[10px] font-bold text-primary">{Math.round((user.aiUnitsUsedThisMonth / user.aiUnitsLimit) * 100)}%</span>
                                            </div>
                                            <div className="w-32 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-primary transition-all duration-500" 
                                                    style={{ width: `${(user.aiUnitsUsedThisMonth / user.aiUnitsLimit) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button 
                                            onClick={() => handleUpdateUser(user.id, { status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' })}
                                            disabled={updating === user.id}
                                            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all ${
                                                user.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                                            }`}
                                        >
                                            <span className={`size-1.5 rounded-full ${user.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : 'bg-red-500'}`}></span>
                                            <span className="text-[10px] font-black uppercase tracking-widest">{user.status}</span>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button 
                                                onClick={() => {
                                                    const limit = prompt("Enter new AI Unit limit:", user.aiUnitsLimit);
                                                    if (limit !== null) handleUpdateUser(user.id, { aiUnitsLimit: limit });
                                                }}
                                                className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" 
                                                title="Adjust Limits"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">tune</span>
                                            </button>
                                            <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Delete Account">
                                                <span className="material-symbols-outlined text-[20px]">delete_forever</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Statistics Bar */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined">group</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Total Registry</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.total}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">verified_user</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Verified Active</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.active}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 border-l-4 border-l-amber-400">
                    <div className="size-12 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">workspace_premium</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Pro Subscribers</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.pro}</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 border-l-4 border-l-indigo-400">
                    <div className="size-12 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">business_center</span>
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Business Users</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{stats.business}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
