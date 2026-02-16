"use client";

import React from "react";

const users = [
    {
        id: "#USR-8821",
        name: "Rohan Adhikari",
        email: "rohan@sajilosathi.com",
        role: "Admin",
        status: "Active",
        lastLogin: "Oct 24, 2023 · 09:15 AM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLu6SnQ6Xj045RYGG0iYG1DF_040G5N1KL7Q7L5fWh6L4Mcvy5fvr5MX0U4M0gjCJG2zbQl27A_tVntTVe77WTWc8Yr5ruBBH7I-MvbMG41XnHaEnyRH7HMU7VvxwulkRDEaqMp3WhNURTJ3USLImOObeSaoOHiH-YDpSdwPRLpUrQ850SF5wssnoj-UW0NfstmCV4t_fKixB2o_0ZDqXYM8GN-yRC7Et5AYKWPu1w14Ihw245I1bIj1hypb0WKtehzxK_8S5bzcI"
    },
    {
        id: "#USR-9102",
        name: "Sita Sharma",
        email: "sita@sajilosathi.com",
        role: "Moderator",
        status: "Active",
        lastLogin: "Oct 23, 2023 · 04:30 PM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_aVyDrxVaYtzsQ9Qyb1eR5Yi-mldozn_9alXdTvvWetSOOQy1FZ_k6sy4ZqZGi3iDbnTEnvd-KSMLQub0Z6a3QAxAftQ-_-97aclEhPUsGc6gf0BBlsZERJberjFtWDYb2dcfRexHp-dXNeiAoGOUS-Cs4deIQgKwXUj7wy2VJUujBYCIeK2es3P8fUqW1o0Mg178Mi1kd89fsAkt__Lv4YgJSm1HNOdhiV8U-4Haarbts_RzmBdN2X6KYW9rp9OyrcPOdxY7I_g"
    },
    {
        id: "#USR-7732",
        name: "Ramesh KC",
        email: "ramesh@sajilosathi.com",
        role: "Moderator",
        status: "Inactive",
        lastLogin: "Sep 12, 2023 · 11:20 AM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuDk3GPnushz91f-KSSuIepJ6BEmfhX2ZG5wvbqlK2KaXxgrEkD-gUfCDFvH27ETJiBZxxXg3CG74K4JE5hNR-rARrOBDz3VHXqbOCmuEWtDn6UVFfZX5Ox1cK7rxGsSxrx1F0rsCstD6r6SnIrE8vZa6JGlMH7qKjG0AMUdyj3WnodWWW4YTU8P8Ouw94DzDVuqPPYLm0O7v3bWgoJBwxSjhisUkE9_ly-exwROSTCYAZL6afVFqI0Zwn-IOHPRFOBwGoYYnPrTiY0"
    },
    {
        id: "#USR-6621",
        name: "Binita Rai",
        email: "binita@sajilosathi.com",
        role: "Admin",
        status: "Active",
        lastLogin: "Oct 24, 2023 · 08:45 AM",
        avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCRYqUXZrsuEJasdAIHkhqsnsdjFk4ka13fZ94GkF2-0fFOnwWTU5iFAPc6g5vGR35KVLZaome6mPIihvnk2bzGEe3ptKM8Rh8jr5EF4QUda1eWelbIZb-ebsLPNvrhK7419kxSizyIU89S7I-b8oQfXhHHtvHYu9kkqPU5HK3OenJtF_GT_U4KHEiqNoB6NOJSNrGrzAIE_GKxZonDVF4l41tphme8EgoJD0luf5JY4XCmuz4r6k0V4wpMLrnRNAZ1-oHAIw-17Q8"
    }
];

export default function UserManagementPage() {
    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Page Action Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Admin User Management</h2>
                    <p className="text-slate-500 text-sm mt-1">Manage administrative roles and system access for your team.</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-lg font-semibold text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                    <span className="material-symbols-outlined text-[20px]">person_add</span>
                    Add New User
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User Details</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Login</th>
                                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group text-slate-900 dark:text-slate-100">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-4">
                                            <img className="size-10 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700" src={user.avatar} alt={user.name} />
                                            <div>
                                                <p className="text-sm font-bold">{user.name}</p>
                                                <p className="text-xs text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 ${user.role === 'Admin' ? 'bg-primary/10 text-primary' : 'bg-amber-100 text-amber-700'} text-xs font-bold rounded-full uppercase tracking-tighter`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <span className={`size-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                            <span className={`text-sm font-medium ${user.status === 'Active' ? 'text-green-700' : 'text-slate-500'}`}>{user.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <p className="text-sm text-slate-500">{user.lastLogin}</p>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg" title="Edit User">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                            <button className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg" title="Remove User">
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
                <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/20">
                    <p className="text-sm text-slate-500">Showing <span className="font-bold text-slate-900 dark:text-white">1</span> to <span className="font-bold text-slate-900 dark:text-white">4</span> of <span className="font-bold text-slate-900 dark:text-white">12</span> entries</p>
                    <div className="flex items-center gap-1">
                        <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30" disabled>
                            <span className="material-symbols-outlined">chevron_left</span>
                        </button>
                        <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">1</button>
                        <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white">2</button>
                        <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white">3</button>
                        <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <span className="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Statistics Bar */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-primary/5 text-primary flex items-center justify-center">
                        <span className="material-symbols-outlined">supervisor_account</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-none">Total Admins</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">12</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">how_to_reg</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-none">Active Now</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">8</p>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
                    <div className="size-12 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center">
                        <span className="material-symbols-outlined">person_pin</span>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider leading-none">Moderators</p>
                        <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">4</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
