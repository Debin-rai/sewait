"use client";

import React from "react";

const guides = [
    {
        title: "New Citizenship Certificate (By Descent)",
        category: "Citizenship Services",
        department: "District Administration Office",
        updatedAt: "Oct 12, 2023",
        status: "Published",
        icon: "badge",
        iconBg: "bg-blue-100 text-blue-700"
    },
    {
        title: "Smart Driving License Renewal",
        category: "Transport Management",
        department: "Department of Transport",
        updatedAt: "Oct 05, 2023",
        status: "Published",
        icon: "directions_car",
        iconBg: "bg-orange-100 text-orange-700"
    },
    {
        title: "Individual PAN Registration Guide",
        category: "Inland Revenue",
        department: "Inland Revenue Department",
        updatedAt: "Sep 28, 2023",
        status: "Draft",
        icon: "account_balance_wallet",
        iconBg: "bg-purple-100 text-purple-700"
    },
    {
        title: "Land Ownership Transfer (Namshari)",
        category: "Land Revenue",
        department: "Land Revenue Office (Malpot)",
        updatedAt: "Sep 15, 2023",
        status: "Published",
        icon: "home",
        iconBg: "bg-emerald-100 text-emerald-700"
    },
    {
        title: "Birth Registration Process",
        category: "Vital Registration",
        department: "Local Ward Office",
        updatedAt: "Aug 30, 2023",
        status: "Published",
        icon: "family_restroom",
        iconBg: "bg-rose-100 text-rose-700"
    }
];

export default function SarkariGuideManagementPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Page Title & CTA */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Sarkari Guide Management</h2>
                    <p className="text-slate-500 mt-1">Manage and update government service procedures and documentation requirements.</p>
                </div>
                <button className="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg font-bold flex items-center gap-2 shadow-sm transition-all whitespace-nowrap">
                    <span className="material-symbols-outlined">add</span>
                    Add New Guide
                </button>
            </div>

            {/* Filters & Search */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                    <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 rounded-lg focus:ring-primary focus:border-primary text-sm text-slate-900 dark:text-white" placeholder="Search guides by title, keyword or department..." type="text" />
                </div>
                <div className="flex gap-2">
                    <select className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-primary focus:border-primary font-medium text-slate-600 dark:text-slate-300">
                        <option>All Categories</option>
                        <option>Citizenship</option>
                        <option>Transport</option>
                        <option>Taxation</option>
                        <option>Land Revenue</option>
                    </select>
                    <select className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg py-2 pl-3 pr-8 text-sm focus:ring-primary focus:border-primary font-medium text-slate-600 dark:text-slate-300">
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                    </select>
                    <button className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">
                        <span className="material-symbols-outlined">filter_list</span>
                    </button>
                </div>
            </div>

            {/* Table Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800">
                <button className="px-6 py-3 text-sm font-bold text-primary border-b-2 border-primary">All Guides</button>
                <button className="px-6 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700 border-b-2 border-transparent hover:border-slate-300">Published</button>
                <button className="px-6 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700 border-b-2 border-transparent hover:border-slate-300">Drafts</button>
            </div>

            {/* Data Table */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Guide Title & Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Updated</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {guides.map((guide, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`size-8 ${guide.iconBg} rounded-lg flex items-center justify-center`}>
                                                <span className="material-symbols-outlined text-sm">{guide.icon}</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-slate-800 dark:text-white">{guide.title}</p>
                                                <p className="text-xs text-slate-500">{guide.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 font-medium">{guide.department}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{guide.updatedAt}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${guide.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'} uppercase`}>
                                            {guide.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-md transition-all">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all">
                                                <span className="material-symbols-outlined text-[20px]">delete</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-500">
                        Showing <span className="text-slate-900 dark:text-white font-bold">1 to 5</span> of <span className="text-slate-900 dark:text-white font-bold">24</span> guides
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 text-sm font-bold text-slate-400 cursor-not-allowed" disabled>Previous</button>
                        <div className="flex gap-1">
                            <button className="size-8 rounded flex items-center justify-center text-sm font-bold bg-primary text-white">1</button>
                            <button className="size-8 rounded flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">2</button>
                            <button className="size-8 rounded flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">3</button>
                            <span className="px-1 text-slate-400">...</span>
                            <button className="size-8 rounded flex items-center justify-center text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700">5</button>
                        </div>
                        <button className="px-3 py-1 text-sm font-bold text-primary hover:bg-primary/5 rounded">Next</button>
                    </div>
                </div>
            </div>

            {/* Stats summary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Guides</p>
                    <p className="text-2xl font-black text-primary mt-1">24</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Most Visited</p>
                    <p className="text-2xl font-black text-primary mt-1">Citizenship</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pending Updates</p>
                    <p className="text-2xl font-black text-orange-500 mt-1">3</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Avg. Completion</p>
                    <p className="text-2xl font-black text-primary mt-1">94%</p>
                </div>
            </div>
        </div>
    );
}
