"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/sewait-portal-99", label: "Dashboard", icon: "dashboard" },
        { href: "/sewait-portal-99/users", label: "User Management", icon: "group" },
        { href: "/sewait-portal-99/rates", label: "Daily Rates", icon: "monitoring" },
        { href: "/sewait-portal-99/calendar", label: "Calendar", icon: "calendar_month" },
        { href: "/sewait-portal-99/content", label: "Content Manager", icon: "description" },
        { href: "/sewait-portal-99/analytics", label: "Analytics", icon: "analytics" },
        { href: "/sewait-portal-99/settings", label: "Admin Settings", icon: "settings" },
        { href: "/sewait-portal-99/logs", label: "System Logs", icon: "history" },
        { href: "/sewait-portal-99/guides", label: "Sarkari Guides", icon: "account_balance" },
        { href: "/sewait-portal-99/ads", label: "Ads Management", icon: "ads_click" },
    ];

    return (
        <aside className="w-64 bg-white border-r border-slate-100 flex flex-col flex-shrink-0 transition-all duration-300 h-screen fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3">
                <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                    <img
                        src="/assets/images/Logo.jpg"
                        alt="सेवा आईटी एडमिन"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex flex-col">
                    <h1 className="text-lg font-bold text-primary leading-tight">सेवा आईटी</h1>
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Admin Panel</span>
                </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${isActive
                                    ? "bg-slate-100 border-l-4 border-primary text-primary font-semibold"
                                    : "text-slate-600 hover:bg-slate-50 font-medium"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[22px]">{link.icon}</span>
                                <span className="text-sm">{link.label}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            <div className="p-6 border-t border-slate-100">
                <button className="flex items-center gap-3 w-full px-4 py-2 text-red-500 font-bold hover:bg-red-50 rounded-lg transition-colors">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}
