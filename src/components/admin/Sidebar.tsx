"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    const pathname = usePathname();

    const navLinks = [
        { href: "/sewait-portal-99", label: "Dashboard", icon: "dashboard" },
        { href: "/sewait-portal-99/users", label: "User Management", icon: "group" },
        { href: "/sewait-portal-99/verifications", label: "Payments Queue", icon: "receipt_long" },
        { href: "/sewait-portal-99/calendar", label: "Calendar", icon: "calendar_month" },
        { href: "/sewait-portal-99/content", label: "Content Manager", icon: "description" },
        { href: "/sewait-portal-99/analytics", label: "Analytics", icon: "analytics" },
        { href: "/sewait-portal-99/chat", label: "AI Chat History", icon: "forum" },
        { href: "/sewait-portal-99/settings", label: "Admin Settings", icon: "settings" },
        { href: "/sewait-portal-99/logs", label: "System Logs", icon: "history" },
        { href: "/sewait-portal-99/guides", label: "SewaIT Guides", icon: "account_balance" },
        { href: "/sewait-portal-99/ads", label: "Ads Management", icon: "ads_click" },
    ];

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                window.location.href = "/sewait-portal-99/login";
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <aside
            className={`
                w-64 bg-white border-r border-slate-100 flex flex-col flex-shrink-0 
                h-screen fixed left-0 top-0 z-50
                transition-transform duration-300 ease-in-out
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}
        >
            {/* Header with close button on mobile */}
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                        <img
                            src="/web-app-manifest-512x512.png"
                            alt="SewaIT Admin"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold text-primary leading-tight">SewaIT</h1>
                        <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Admin Panel</span>
                    </div>
                </div>
                {/* Close button - visible only on mobile */}
                <button
                    onClick={onClose}
                    className="md:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Close sidebar"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
                <div className="space-y-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={onClose}
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
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full px-4 py-2 text-red-500 font-bold hover:bg-red-50 rounded-lg transition-colors"
                >
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text-sm">Logout</span>
                </button>
            </div>
        </aside>
    );
}
