"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Header() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/calendar", label: "Calendar" },
        { href: "/weather", label: "Weather" },
        { href: "/gold-silver", label: "Gold & Silver" },
        { href: "/sewa-ai", label: "Sewa AI", isNew: true },
        { href: "/guides", label: "Gov. Services" },
        { href: "/about", label: "About" },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 md:px-10 py-3 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-10">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative w-10 h-10 overflow-hidden rounded-lg transition-transform duration-300 group-hover:scale-105">
                            <img
                                src="/web-app-manifest-512x512.png"
                                alt="SewaIT Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-slate-900">Sewa<span className="text-primary">IT</span></h1>
                    </Link>
                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-all duration-300 relative ${isActive
                                        ? "text-primary font-bold nav-link-active"
                                        : "text-slate-600 hover:text-primary hover:bg-primary/5 nav-link-hover"
                                        }`}
                                >
                                    {link.label}
                                    {(link as any).isNew && (
                                        <span className="absolute -top-1.5 -right-1 flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
                <div className="flex items-center gap-4 lg:gap-8 flex-1 justify-end">
                    {/* Desktop Search */}
                    <div className="relative w-full max-w-[320px] hidden sm:flex items-center">
                        <div className="absolute left-3 w-5 h-5 flex items-center justify-center overflow-hidden pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-xl notranslate">search</span>
                        </div>
                        <input
                            id="search-desktop"
                            name="q"
                            className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/5 focus:border-primary rounded-xl pl-10 pr-20 text-xs py-2 transition-all outline-none"
                            placeholder="Search services..."
                            type="text"
                            aria-label="Search services"
                            autoComplete="off"
                        />
                        <button className="absolute right-1 bg-primary text-white text-[9px] font-bold px-3 py-1.5 rounded-lg hover:bg-primary-light transition-all duration-300 hover:shadow-md active:scale-95">
                            GO
                        </button>
                    </div>
                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-all duration-300 active:scale-90"
                        aria-label="Toggle menu"
                    >
                        <span className="material-symbols-outlined text-slate-700">
                            {mobileMenuOpen ? "close" : "menu"}
                        </span>
                    </button>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 animate-in fade-in duration-200"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu Sidebar */}
            <div
                className={`lg:hidden fixed top-0 right-0 h-screen w-80 max-w-[85vw] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-slate-800">Menu</h2>
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <span className="material-symbols-outlined text-slate-700">close</span>
                        </button>
                    </div>

                    {/* Mobile Navigation Links */}
                    <nav className="space-y-2">
                        {navLinks.map((link, index) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg transition-all duration-300 ${isActive
                                        ? "bg-primary text-white font-bold shadow-md"
                                        : "text-slate-700 hover:bg-slate-100 hover:pl-6 font-semibold"
                                        }`}
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Mobile Search */}
                    <div className="mt-8">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                search
                            </span>
                            <input
                                id="search-mobile"
                                name="q"
                                className="w-full bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-primary/5 focus:border-primary rounded-lg pl-10 pr-4 py-3 text-sm outline-none"
                                placeholder="Search services..."
                                type="text"
                                aria-label="Search services"
                                autoComplete="off"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
