"use client";

import React, { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/animations/FadeIn";

const initialNews = [
    { id: 1, title: "Public holiday announced for tomorrow", category: "Holiday", date: "2026-02-18", status: "Active" },
    { id: 3, title: "New traffic rules in Kathmandu Valley", category: "Update", date: "2026-02-16", status: "Draft" },
];

export default function NewsSnippetsPage() {
    const [news, setNews] = useState(initialNews);

    return (
        <FadeIn direction="up">
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <Link
                            href="/sewait-portal-99/content"
                            className="text-primary text-xs font-bold flex items-center gap-1 hover:underline mb-2"
                        >
                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                            Back to Content Directory
                        </Link>
                        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">News Snippets</h2>
                        <p className="text-slate-500">Manage highlights and scrolling tickers for the home feed.</p>
                    </div>
                    <button className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center gap-2">
                        <span className="material-symbols-outlined">add</span>
                        Create Snippet
                    </button>
                </div>

                {/* News List */}
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[11px] font-black uppercase tracking-widest text-slate-400">
                                <th className="px-6 py-4">Title</th>
                                <th className="px-6 py-4">Category</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {news.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800 dark:text-white text-sm">{item.title}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.category}</td>
                                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.date}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex px-2 py-1 rounded-md text-[10px] font-bold uppercase ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-1.5 text-slate-400 hover:text-primary transition-colors">
                                                <span className="material-symbols-outlined text-sm">edit</span>
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-red-500 transition-colors">
                                                <span className="material-symbols-outlined text-sm">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </FadeIn>
    );
}
