"use client";
import NotificationPanel from "./NotificationPanel";

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
            <div className="flex items-center gap-3">
                {/* Hamburger menu - visible only on mobile */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-slate-600 hover:text-primary hover:bg-slate-100 rounded-lg transition-colors"
                    aria-label="Toggle menu"
                >
                    <span className="material-symbols-outlined text-2xl">menu</span>
                </button>
                <nav className="flex items-center text-sm text-slate-500 gap-2">
                    <span className="hover:text-primary cursor-pointer text-xs font-bold uppercase tracking-wider hidden sm:inline">SewaIT Portal</span>
                    <span className="material-symbols-outlined text-xs hidden sm:inline">chevron_right</span>
                    <span className="text-slate-900 dark:text-white font-medium">Dashboard</span>
                </nav>
            </div>
            <div className="flex items-center gap-3 md:gap-6">
                <div className="relative group hidden lg:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <input
                        id="admin-search"
                        name="admin-q"
                        className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 transition-all outline-none"
                        placeholder="Search system logs..."
                        type="text"
                        aria-label="Search system logs"
                    />
                </div>
                <div className="flex items-center gap-1 md:gap-3">
                    <NotificationPanel />
                    <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg hidden sm:block">
                        <span className="material-symbols-outlined">help</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
