"use client";

import React from "react";

const ads = [
    {
        name: "Summer Sale 2023",
        category: "Retail Category",
        location: "Header Banner",
        startDate: "01/06/2023",
        endDate: "31/08/2023",
        status: "Active",
        statusColor: "text-[#07883b]",
        statusBg: "bg-[#07883b]",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAQ5Z04kRlGNCeiEVZjTp_N2ztvWIhVK0I1E5sL_tqAr7aNxuRH0SLjVN816bKG-_88GO2JXmK5wb7aT6SVAcAZdng7F-Ba4wYxuehDuXQCeVLh1_eCoapCDbjlxbj2NdDFkwdZC2iBNRL58_UC8g9FpXVD-G8IvXijB-AOQiRN8Y3r4_ZJfOUPVmqUrY7o75EuA3SduqByG6WliiOCCrboqsZsoLCTCPv5Yv_z4WH9NcwglDsVOz_hvLNV5eGaDxUqebpNoBjwdok"
    },
    {
        name: "Partner Brand X - Premium",
        category: "Tech/SaaS",
        location: "Sidebar Widget",
        startDate: "15/07/2023",
        endDate: "15/08/2023",
        status: "Scheduled",
        statusColor: "text-orange-500",
        statusBg: "bg-orange-500",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFEUi1RazQXbAW1BzkVv3--TQz-_VXe6naaFdwcP1SzbCo_QRkoIcQdganH6Or6KtC0PdR_qljkAjytE0S16f01L8U7lwbHS_VU-pGwrsHsn7SsqzUPVlhgNWoO5OSNscXQJkvfSnRqkjINb5n664kDtAWNKjasA1WeRJW4wLeg5yX6ZhCaA39ZxMo3qnDKB7T7jlrTQirgLLPgXWneNuXX48LRzjaG1Wkn6jskhz4VKtF4-siqJKwUM6MvVBT0a2YSkPHFG4plLc"
    },
    {
        name: "Flash Deal Friday",
        category: "Food & Beverage",
        location: "Home Page",
        startDate: "01/05/2023",
        endDate: "31/05/2023",
        status: "Expired",
        statusColor: "text-gray-400",
        statusBg: "bg-gray-400",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAgd2JVlFNtMc-OxWtpagA1KMbyOaYxYe9QpcyqzOd6R4pEkXILtDrS4dwzLTRoSShBmTKnLJXE2yWyaJW2V29QyVyKkKHB1Q60tE5EC5BdXlmckKc70GkWBuTFRdohppauz1KgIL3dYuVHAEl_CiRgoC9gXmZ3EWA-iju-1dkQt8wDUxHBJEd9yjH5tul3ZwDPyJOmJpBEV2uGd6p7k-3vycqCLyjXFekH28UqRJYNUt5fya7vdLOCS5OKJFGv5ogVoG0x8TaJ1oc"
    },
    {
        name: "Winter Warmth Campaign",
        category: "Lifestyle",
        location: "Header Banner",
        startDate: "01/11/2022",
        endDate: "31/01/2023",
        status: "Expired",
        statusColor: "text-gray-400",
        statusBg: "bg-gray-400",
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAV_4EJweBP_GAUHTf2CB8SqhLb4ZstFlyB_cKSx-fH34OV0twkQbDZtT6dt8NpZvz-_EcAZK_O5oUmJNhDbrtaO7IdvYg1F5IdRg6bA5IDgsv6UvVIbGR0dzLgVMfGBq_NLADqUf98EVV9F9PLvO211M1aRnvHPFgd8LOTRq-zsuAnx_848qOGox6_8qy2S3ooI4XLZPRwZdI99z9jZY20n3LsDmd7bdKJ2ujyjQSU3ZIWlEmF95-RIfGw29yo_boWKpMstU_EyIY"
    }
];

export default function AdsManagementPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header section with Stats */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                <div>
                    <h2 className="text-3xl font-black text-primary dark:text-blue-400 tracking-tight">Ad Management</h2>
                    <p className="text-slate-500 mt-1 font-medium">Oversee and optimize your platform's advertising campaigns.</p>
                </div>
                <button className="bg-primary text-white px-5 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm shadow-sm hover:bg-primary/90 transition-all">
                    <span className="material-symbols-outlined text-xl">add</span>
                    Create New Ad
                </button>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">payments</span>
                        </div>
                        <span className="text-[#07883b] bg-[#07883b]/10 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">trending_up</span> 12.5%
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Ad Revenue</p>
                    <h3 className="text-3xl font-black text-primary dark:text-white mt-1">$42,500.00</h3>
                    <p className="text-slate-400 text-xs mt-2">vs last month ($37,800)</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">campaign</span>
                        </div>
                        <span className="text-[#07883b] bg-[#07883b]/10 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">arrow_upward</span> 4.2%
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Active Campaigns</p>
                    <h3 className="text-3xl font-black text-primary dark:text-white mt-1">24</h3>
                    <p className="text-slate-400 text-xs mt-2">Currently running live on site</p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <span className="material-symbols-outlined">visibility</span>
                        </div>
                        <span className="text-[#07883b] bg-[#07883b]/10 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">trending_up</span> 8.1%
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total Impressions</p>
                    <h3 className="text-3xl font-black text-primary dark:text-white mt-1">1.2M</h3>
                    <p className="text-slate-400 text-xs mt-2">Across all active placements</p>
                </div>
            </div>

            {/* Table Section */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex items-center gap-3 flex-1 min-w-[300px]">
                        <div className="relative flex-1 max-w-sm">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">search</span>
                            <input className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-1 focus:ring-primary/20 text-slate-900 dark:text-white" placeholder="Search ads by name..." type="text" />
                        </div>
                        <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary/20">
                            <option>All Locations</option>
                            <option>Header</option>
                            <option>Sidebar</option>
                            <option>Home Page</option>
                        </select>
                        <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-4 py-2 text-slate-900 dark:text-white focus:ring-1 focus:ring-primary/20">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Scheduled</option>
                            <option>Expired</option>
                        </select>
                    </div>
                    <button className="text-slate-500 hover:text-primary flex items-center gap-1 text-sm font-semibold transition-colors">
                        <span className="material-symbols-outlined text-lg">filter_list</span>
                        More Filters
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-800">
                            <tr>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Ad Name</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Location</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-center">Dates</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {ads.map((ad, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded bg-slate-100 dark:bg-slate-800 flex-shrink-0 overflow-hidden">
                                                <img src={ad.thumbnail} alt={ad.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm text-primary dark:text-blue-400">{ad.name}</p>
                                                <p className="text-xs text-slate-500">{ad.category}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-primary/5 text-primary dark:text-blue-300 text-[11px] font-bold rounded uppercase">{ad.location}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-center">
                                        <div className="font-medium text-slate-700 dark:text-slate-300">{ad.startDate}</div>
                                        <div className="text-[10px] text-slate-400 uppercase font-bold">to {ad.endDate}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`flex items-center gap-1.5 ${ad.statusColor} text-xs font-bold`}>
                                            <span className={`size-2 rounded-full ${ad.statusBg}`}></span> {ad.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                                            <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-500 transition-colors">
                                                <span className="material-symbols-outlined text-lg">
                                                    {ad.status === 'Active' ? 'pause_circle' : ad.status === 'Scheduled' ? 'play_circle' : 'refresh'}
                                                </span>
                                            </button>
                                            <button className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded text-red-500 transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                    <p className="text-xs text-slate-500 font-semibold tracking-wide uppercase">Showing 1-10 of 24 Ads</p>
                    <div className="flex gap-1">
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-400 disabled:opacity-30" disabled>
                            <span className="material-symbols-outlined text-lg">chevron_left</span>
                        </button>
                        <button className="px-3 py-1 bg-primary text-white text-sm font-bold rounded border border-primary">1</button>
                        <button className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded border border-slate-200 dark:border-slate-700">2</button>
                        <button className="px-3 py-1 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white text-sm font-bold rounded border border-slate-200 dark:border-slate-700">3</button>
                        <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
                            <span className="material-symbols-outlined text-lg">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
