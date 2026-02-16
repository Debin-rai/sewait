"use client";

import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { usePathname } from "next/navigation";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname === "/admin/login";

    if (isLoginPage) {
        return <div className="min-h-screen bg-slate-50 dark:bg-slate-900 font-display">{children}</div>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 font-display text-slate-900 dark:text-slate-100">
            <Sidebar />
            <div className="flex-1 flex flex-col pl-64 transition-all duration-300">
                <AdminHeader />
                <main className="flex-1 p-8 overflow-y-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}
