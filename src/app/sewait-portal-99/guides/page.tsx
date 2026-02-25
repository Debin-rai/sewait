"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SewaITGuideManagementPage() {
    const [loading, setLoading] = useState(false);
    const [guides, setGuides] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [categoryFilter, setCategoryFilter] = useState("All Categories");

    useEffect(() => {
        fetchGuides();
    }, []);

    const fetchGuides = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/sewait-portal-99/guides");
            const data = await res.json();
            if (Array.isArray(data)) {
                setGuides(data);
            }
        } catch (error) {
            console.error("Failed to fetch guides", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

        try {
            const res = await fetch(`/api/sewait-portal-99/guides?id=${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setGuides(guides.filter(g => g.id !== id));
            } else {
                alert("Failed to delete guide");
            }
        } catch (err) {
            alert("Error deleting guide");
        }
    };

    const filteredGuides = guides.filter(guide => {
        const matchesSearch = guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            guide.department?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "All Status" || guide.status === statusFilter;
        const matchesCategory = categoryFilter === "All Categories" || guide.category === categoryFilter;
        return matchesSearch && matchesStatus && matchesCategory;
    });

    const categories = Array.from(new Set(guides.map(g => g.category)));

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Page Title & CTA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">SewaIT Guide Management</h2>
                    <p className="text-slate-500 mt-1">Manage and update government service procedures and documentation requirements.</p>
                </div>
                <Link
                    href="/sewait-portal-99/guides/new"
                    className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap"
                >
                    <span className="material-symbols-outlined">add</span>
                    Add New Guide
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm text-slate-900 dark:text-white outline-none transition-all"
                        placeholder="Search guides by title or department..."
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <select
                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-primary focus:border-primary font-medium text-slate-600 dark:text-slate-300 outline-none"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        <option>All Categories</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <select
                        className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-primary focus:border-primary font-medium text-slate-600 dark:text-slate-300 outline-none"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                    </select>
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guide Title & Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium">Loading guides...</td>
                                </tr>
                            ) : filteredGuides.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-slate-400 font-medium">No guides found.</td>
                                </tr>
                            ) : filteredGuides.map((guide) => (
                                <tr key={guide.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                                                <span className="material-symbols-outlined text-sm">{guide.icon || 'description'}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">{guide.title}</p>
                                                <p className="text-xs text-slate-500">{guide.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{guide.department || '—'}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${guide.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'} uppercase font-display`}>
                                            {guide.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link
                                                href={`/sewait-portal-99/guides/${guide.id}/edit`}
                                                className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-md transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(guide.id, guide.title)}
                                                className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                                            >
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Stats summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Guides</p>
                    <p className="text-2xl font-black text-primary mt-1">{guides.length}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Published</p>
                    <p className="text-2xl font-black text-primary mt-1">{guides.filter(g => g.status === 'Published').length}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Drafts</p>
                    <p className="text-2xl font-black text-orange-500 mt-1">{guides.filter(g => g.status === 'Draft').length}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Categories</p>
                    <p className="text-2xl font-black text-primary mt-1">{categories.length}</p>
                </div>
            </div>
        </div>
    );
}
