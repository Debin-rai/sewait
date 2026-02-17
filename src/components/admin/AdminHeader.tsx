"use client";

export default function AdminHeader() {
    return (
        <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-8 z-10 sticky top-0">
            <div className="flex items-center gap-4">
                <nav className="flex items-center text-sm text-slate-500 gap-2">
                    <span className="hover:text-primary cursor-pointer text-xs font-bold uppercase tracking-wider">SewaIT Portal</span>
                    <span className="material-symbols-outlined text-xs">chevron_right</span>
                    <span className="text-slate-900 dark:text-white font-medium">Dashboard</span>
                </nav>
            </div>
            <div className="flex items-center gap-6">
                <div className="relative group hidden md:block">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
                    <input
                        className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm focus:ring-2 focus:ring-primary w-64 transition-all outline-none"
                        placeholder="Search system logs..."
                        type="text"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg relative">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full ring-2 ring-white"></span>
                    </button>
                    <button className="p-2 text-slate-500 hover:text-primary hover:bg-slate-100 rounded-lg">
                        <span className="material-symbols-outlined">help</span>
                    </button>
                </div>
            </div>
        </header>
    );
}
