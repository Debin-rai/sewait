"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from '@/context/LanguageContext';
import { useTheme, THEMES } from '@/context/ThemeContext';
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemePicker from "./ThemePicker";

export default function Header() {
    const pathname = usePathname();
    const router = useRouter();
    const { language } = useLanguage();
    const { theme } = useTheme();
    const [scrolled, setScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [placeholderIndex, setPlaceholderIndex] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);

    // Auth Check
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.authenticated) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error("Auth check in header failed:", err);
            } finally {
                setAuthChecked(true);
            }
        };
        checkAuth();
    }, []);

    const handleLogout = async () => {
        try {
            await fetch("/api/auth/logout", { method: "POST" });
            window.location.href = "/";
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    // Animated Placeholder Logic
    const placeholders = [
        "Search services...",
        "guide passport",
        "guide pan card",
        "Sarkari AI Assistant",
        "Nepali Calendar 2082",
        "Official Documents",
        "Debin Rai"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [placeholders.length]);

    // Real-time Search Logic
    useEffect(() => {
        const fetchResults = async () => {
            if (searchQuery.length < 1) {
                setResults([]);
                return;
            }
            setIsSearching(true);
            try {
                const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
                const data = await res.json();
                setResults(data);
            } catch (err) {
                console.error("Search error:", err);
            } finally {
                setIsSearching(false);
            }
        };

        const timer = setTimeout(fetchResults, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, router]);

    // Click Outside listener
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setResults([]);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/calendar", label: "Calendar" },
        { href: "/sewa-ai", label: "Sarkari AI", isNew: true },
        { href: "/guides", label: "Gov. Services" },
        { href: "/premium", label: "Premium", isNew: true },
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
                        <h1 className="text-xl font-bold tracking-tight text-slate-800 transition-colors duration-300 group-hover:text-slate-900">
                            Sewa<span style={{ color: THEMES[theme].primary }}>IT</span>
                        </h1>
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
                                        ? "font-bold nav-link-active"
                                        : "text-slate-600 hover:text-primary hover:bg-primary/5 nav-link-hover"
                                        }`}
                                    style={isActive ? { color: THEMES[theme].primary } : {}}
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
                    <div className="relative w-full max-w-[320px] hidden sm:flex items-center bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-primary/5 focus-within:border-primary rounded-xl transition-all" ref={dropdownRef}>
                        <div className="absolute left-3 w-5 h-5 flex items-center justify-center overflow-hidden pointer-events-none">
                            <span className="material-symbols-outlined text-slate-400 text-xl notranslate">search</span>
                        </div>
                        <div className="absolute left-10 right-20 pointer-events-none overflow-hidden h-full flex items-center">
                            <AnimatePresence mode="wait">
                                {!searchQuery && (
                                    <motion.span
                                        key={placeholderIndex}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                        className="text-slate-400 text-xs whitespace-nowrap"
                                    >
                                        {placeholders[placeholderIndex]}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </div>
                        <input
                            id="search-desktop"
                            name="q"
                            className="w-full bg-transparent pl-10 pr-20 text-xs py-2 transition-all outline-none relative z-10"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && searchQuery) {
                                    router.push(`/guides?q=${encodeURIComponent(searchQuery)}`);
                                    setResults([]);
                                }
                            }}
                            aria-label="Search services"
                            autoComplete="off"
                        />
                        <div className="absolute right-1 flex items-center gap-1">
                            {isSearching && (
                                <div
                                    className="w-3 h-3 border-2 border-t-transparent rounded-full animate-spin mr-1"
                                    style={{ borderColor: THEMES[theme].primary, borderTopColor: 'transparent' }}
                                ></div>
                            )}
                            <button
                                onClick={() => {
                                    if (searchQuery) {
                                        router.push(`/guides?q=${encodeURIComponent(searchQuery)}`);
                                        setResults([]);
                                    }
                                }}
                                className="text-white text-[9px] font-bold px-3 py-1.5 rounded-lg transition-all duration-300 hover:shadow-md active:scale-95"
                                style={{ backgroundColor: THEMES[theme].primary }}
                            >
                                GO
                            </button>
                        </div>

                        {/* Search Results Dropdown */}
                        {results.length > 0 && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-2xl z-[60] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">
                                    {results.map((res) => (
                                        <Link
                                            key={res.id}
                                            href={res.url}
                                            onClick={() => {
                                                setResults([]);
                                                setSearchQuery("");
                                            }}
                                            className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors group"
                                        >
                                            <div
                                                className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center transition-colors group-hover:bg-opacity-10"
                                                style={{ color: THEMES[theme].primary, '--hover-bg': `${THEMES[theme].primary}10` } as any}
                                            >
                                                <span className="material-symbols-outlined text-lg">{res.icon}</span>
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <span className="text-xs font-bold text-slate-800 truncate">{res.title}</span>
                                                <span className="text-[10px] text-slate-400 font-medium truncate">{res.category}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <ThemePicker />

                        {/* User Profile Section */}
                        {authChecked && (
                            <div className="flex items-center gap-3 relative" ref={profileDropdownRef}>
                                {user ? (
                                    <>
                                        <button 
                                            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                            className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all active:scale-95"
                                        >
                                            <div
                                                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold border transition-colors"
                                                style={{
                                                    color: THEMES[theme].primary,
                                                    backgroundColor: `${THEMES[theme].primary}10`,
                                                    borderColor: `${THEMES[theme].primary}20`
                                                }}
                                            >
                                                {user.name?.[0] || user.email[0].toUpperCase()}
                                            </div>
                                            <div className="flex flex-col text-left hidden sm:flex">
                                                <span className="text-[10px] font-black text-slate-800 leading-none">{user.name || user.email.split('@')[0]}</span>
                                                <span className={`text-[8px] font-bold uppercase tracking-tight leading-none mt-0.5 ${user.subscriptionStatus === 'PREMIUM' ? 'text-amber-600' : 'text-slate-400'}`}>
                                                    {user.subscriptionStatus === 'PREMIUM' ? 'PRO' : 'Free'}
                                                </span>
                                            </div>
                                            <span className={`material-symbols-outlined text-sm text-slate-400 transition-transform duration-300 ${profileDropdownOpen ? 'rotate-180' : ''}`}>expand_more</span>
                                        </button>

                                        {/* Dropdown Menu */}
                                        <AnimatePresence>
                                            {profileDropdownOpen && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl z-[70] overflow-hidden p-2"
                                                >
                                                    <div className="px-4 py-3 border-b border-slate-50 mb-1">
                                                        <p className="text-xs font-bold text-slate-900">{user.name || 'User'}</p>
                                                        <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <Link 
                                                            href="/settings" 
                                                            onClick={() => setProfileDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
                                                            <span className="text-sm font-semibold">Profile Settings</span>
                                                        </Link>
                                                        <Link 
                                                            href="/premium" 
                                                            onClick={() => setProfileDropdownOpen(false)}
                                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 transition-all"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">workspace_premium</span>
                                                            <span className="text-sm font-semibold">Subscription</span>
                                                        </Link>
                                                        <button 
                                                            onClick={handleLogout}
                                                            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                                                        >
                                                            <span className="material-symbols-outlined text-[20px]">logout</span>
                                                            <span className="text-sm font-semibold">Sign Out</span>
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <div className="hidden sm:flex items-center gap-2">
                                        <Link href="/login" className="text-xs font-bold text-slate-600 px-2 transition-colors nav-link-hover" style={{ '--hover-color': THEMES[theme].primary } as any}>Log In</Link>
                                        <Link
                                            href="/register"
                                            className="text-white text-xs font-bold px-4 py-2 rounded-lg shadow-sm transition-all hover:opacity-90"
                                            style={{ backgroundColor: THEMES[theme].primary }}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                )}
                            </div>
                        )}

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
                        <div className="relative bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-primary/5 focus-within:border-primary rounded-lg transition-all overflow-hidden flex items-center">
                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                                search
                            </span>
                            <div className="absolute inset-y-0 left-10 flex items-center pointer-events-none">
                                <AnimatePresence mode="wait">
                                    {!searchQuery && (
                                        <motion.span
                                            key={placeholderIndex}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.4 }}
                                            className="text-slate-400 text-sm"
                                        >
                                            {placeholders[placeholderIndex]}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>
                            <input
                                id="search-mobile"
                                name="q"
                                className="w-full bg-transparent pl-10 pr-4 py-3 text-sm outline-none relative z-10"
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && searchQuery) {
                                        setMobileMenuOpen(false);
                                        router.push(`/guides?q=${encodeURIComponent(searchQuery)}`);
                                        setResults([]);
                                    }
                                }}
                                aria-label="Search services"
                                autoComplete="off"
                            />
                        </div>
                        {results.length > 0 && searchQuery.length > 0 && (
                            <div className="mt-2 bg-white border border-slate-100 rounded-xl shadow-lg p-2 space-y-1 overflow-hidden">
                                {results.map((res) => (
                                    <Link
                                        key={res.id}
                                        href={res.url}
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            setResults([]);
                                            setSearchQuery("");
                                        }}
                                        className="flex items-center gap-3 p-3 hover:bg-slate-50 rounded-lg"
                                    >
                                        <span className="material-symbols-outlined text-primary">{res.icon}</span>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-bold text-slate-800">{res.title}</span>
                                            <span className="text-[10px] text-slate-400 font-medium uppercase">{res.category}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
