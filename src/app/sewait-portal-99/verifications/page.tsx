"use client";

import React, { useState, useEffect } from "react";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function SubscriptionQueuePage() {
    const { theme } = useTheme();
    const [verifications, setVerifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState<string | null>(null);

    const fetchVerifications = async () => {
        try {
            const res = await fetch("/api/sewait-portal-99/verifications");
            const data = await res.json();
            if (Array.isArray(data)) setVerifications(data);
        } catch (error) {
            console.error("Failed to fetch verifications", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVerifications();
    }, []);

    const handleUpdateStatus = async (id: string, status: 'APPROVED' | 'REJECTED') => {
        if (!confirm(`Are you sure you want to mark this as ${status}?`)) return;
        setProcessing(id);
        try {
            const res = await fetch("/api/sewait-portal-99/verifications", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            });
            if (res.ok) {
                await fetchVerifications();
            } else {
                alert("Failed to update status");
            }
        } catch (err) {
            alert("Error processing request");
        } finally {
            setProcessing(null);
        }
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Payment Verification Queue</h2>
                <p className="text-slate-500 text-sm mt-1">Review and approve manual payment submissions for Pro and Business plans.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Transaction ID</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Requested Plan</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {loading ? (
                                <tr><td colSpan={6} className="px-6 py-20 text-center animate-pulse text-slate-400 font-bold uppercase tracking-widest">Loading queue...</td></tr>
                            ) : verifications.length === 0 ? (
                                <tr><td colSpan={6} className="px-6 py-20 text-center text-slate-400 italic">No verification requests found.</td></tr>
                            ) : verifications.map((v) => (
                                <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group text-slate-900 dark:text-slate-100">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold">{v.user.name || 'Anonymous'}</p>
                                        <p className="text-xs text-slate-500">{v.user.email}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <code className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-xs font-black text-primary">{v.transactionId}</code>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                            v.planRequested === 'PRO' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'
                                        }`}>
                                            {v.planRequested}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-slate-500">
                                        {new Date(v.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${
                                            v.status === 'PENDING' ? 'text-amber-500' : 
                                            v.status === 'APPROVED' ? 'text-emerald-500' : 'text-red-500'
                                        }`}>
                                            <span className={`size-1.5 rounded-full ${
                                                v.status === 'PENDING' ? 'bg-amber-500 animate-pulse' : 
                                                v.status === 'APPROVED' ? 'bg-emerald-500' : 'bg-red-500'
                                            }`}></span>
                                            {v.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {v.status === 'PENDING' ? (
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleUpdateStatus(v.id, 'APPROVED')}
                                                    disabled={processing === v.id}
                                                    className="px-3 py-1.5 bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 active:scale-95"
                                                >
                                                    Approve
                                                </button>
                                                <button 
                                                    onClick={() => handleUpdateStatus(v.id, 'REJECTED')}
                                                    disabled={processing === v.id}
                                                    className="px-3 py-1.5 bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-red-100 active:scale-95"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-[10px] font-bold text-slate-400 uppercase">Resolved</span>
                                        )}
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
