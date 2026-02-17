"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/calendar", label: "Calendar" },
        { href: "/weather", label: "Weather" },
        { href: "/gold-silver", label: "Gold & Silver" },
        { href: "/nepse", label: "NEPSE" },
        { href: "/guides", label: "Gov. Services" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-10 py-3 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-10">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-10 h-10 overflow-hidden rounded-lg">
                        <img
                            src="/assets/images/Logo.jpg"
                            alt="SewaIT Logo"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-slate-800">Sewa<span className="text-primary">IT</span></h1>
                </Link>
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`${isActive
                                    ? "text-primary text-sm font-bold border-b-2 border-primary"
                                    : "text-slate-600 hover:text-primary text-sm font-semibold"
                                    } transition-colors`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="flex items-center gap-4 lg:gap-8 flex-1 justify-end">
                <div className="relative w-full max-w-[320px] hidden sm:flex items-center">
                    <div className="absolute left-3 w-5 h-5 flex items-center justify-center overflow-hidden pointer-events-none">
                        <span className="material-symbols-outlined text-slate-400 text-xl notranslate">search</span>
                    </div>
                    <input
                        className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/5 focus:border-primary rounded-xl pl-10 pr-20 text-xs py-2 transition-all outline-none"
                        placeholder="Search services..."
                        type="text"
                    />
                    <button className="absolute right-1 bg-primary text-white text-[9px] font-bold px-3 py-1.5 rounded-lg hover:bg-primary-light transition-colors">
                        GO
                    </button>
                </div>
            </div>
        </header>
    );
}
