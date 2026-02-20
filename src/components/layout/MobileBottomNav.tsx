"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { href: "/", icon: "home", label: "Home" },
    { href: "/calendar", icon: "calendar_month", label: "Calendar" },
    { href: "/gold-silver", icon: "payments", label: "Rates" },
    { href: "/sewa-ai", icon: "smart_toy", label: "SewaAI" },
    { href: "/guides", icon: "gavel", label: "Services" },
];

export default function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
            <div className="flex items-center justify-around px-2 py-1.5 max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all min-w-[56px] ${isActive
                                ? "text-primary"
                                : "text-slate-400 hover:text-slate-600"
                                }`}
                        >
                            <span
                                className={`material-symbols-outlined text-xl transition-all ${isActive ? "scale-110" : ""
                                    }`}
                                style={{
                                    fontVariationSettings: isActive
                                        ? "'FILL' 1, 'wght' 600, 'GRAD' 0, 'opsz' 24"
                                        : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                                }}
                            >
                                {item.icon}
                            </span>
                            <span className={`text-[10px] leading-none ${isActive ? "font-bold" : "font-medium"}`}>
                                {item.label}
                            </span>
                            {isActive && (
                                <div className="w-1 h-1 bg-primary rounded-full mt-0.5" />
                            )}
                        </Link>
                    );
                })}
            </div>
            {/* Safe area for iPhone notch */}
            <div className="h-[env(safe-area-inset-bottom)]" />
        </nav>
    );
}
