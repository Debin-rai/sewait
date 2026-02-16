"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email");
        const password = formData.get("password");

        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Login failed");
            }

            // Success! Next.js middleware will now allow access
            router.push("/admin");
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans">
            {/* Top Navigation */}
            <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 lg:px-12 bg-white shadow-sm sticky top-0 z-50">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform overflow-hidden">
                        <span className="material-symbols-outlined font-bold">shield_person</span>
                    </div>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900">सजिलो साथी <span className="text-slate-400">एडमिन</span></h1>
                </Link>
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-sm font-bold text-slate-500 hover:text-primary transition-colors">Main Website</Link>
                    <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg text-sm font-bold border border-slate-200 shadow-sm transition-all hover:bg-slate-50 active:scale-95">
                        <span className="material-symbols-outlined text-lg">help</span>
                        Support
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-1 flex items-center justify-center p-6 bg-slate-50">
                {/* Login Card */}
                <div className="w-full max-w-[480px] bg-white rounded-2xl shadow-2xl shadow-slate-200/60 border border-slate-100 p-10 lg:p-12 animate-in fade-in zoom-in-95 duration-700">
                    <div className="mb-10 text-center sm:text-left">
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-3">Welcome Back</h2>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">Enter your credentials to access the admin portal.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 animate-in fade-in slide-in-from-top-2">
                            <span className="material-symbols-outlined text-xl">error_outline</span>
                            <p className="text-sm font-bold">{error}</p>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="space-y-2.5">
                            <label className="text-sm font-bold text-slate-700 block" htmlFor="email">Email Address</label>
                            <input
                                className="w-full h-14 px-4 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium"
                                id="email"
                                name="email"
                                placeholder="e.g., admin@sajilosathi.com"
                                type="email"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2.5">
                            <div className="flex justify-between items-center">
                                <label className="text-sm font-bold text-slate-700 block" htmlFor="password">Password</label>
                                <a className="text-xs font-bold text-primary hover:underline transition-colors" href="#">Forgot Password?</a>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    className="w-full h-14 px-4 pr-12 rounded-xl border border-slate-200 bg-slate-50/30 text-slate-900 placeholder:text-slate-400 focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all outline-none text-sm font-medium"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    required
                                />
                                <button
                                    className="absolute right-4 text-slate-400 hover:text-slate-600 transition-colors"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-symbols-outlined text-xl">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Remember Me */}
                        <div className="flex items-center gap-3 py-1">
                            <input
                                className="h-5 w-5 rounded-md border-slate-300 border-2 bg-white text-primary focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer accent-primary"
                                id="remember"
                                type="checkbox"
                            />
                            <label className="text-sm font-bold text-slate-600 cursor-pointer select-none" htmlFor="remember">Remember this device</label>
                        </div>

                        {/* Sign In Button */}
                        <button
                            className="w-full h-14 bg-[#1a2f4b] hover:bg-[#12223a] text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-3 mt-6 group disabled:opacity-70 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={loading}
                        >
                            <span className="text-base">{loading ? "Authenticating..." : "Sign In"}</span>
                            {!loading && (
                                <div className="w-6 h-6 flex items-center justify-center overflow-hidden">
                                    <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">login</span>
                                </div>
                            )}
                            {loading && <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                        </button>
                    </form>

                    {/* Bottom Note */}
                    <div className="mt-10 pt-8 border-t border-slate-100 flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-emerald-600 text-lg">check_circle</span>
                        <p className="text-[11px] uppercase tracking-widest font-black text-slate-400">Secure Admin Access Only</p>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="py-8 px-12 border-t border-slate-200 bg-white text-center">
                <p className="text-xs font-bold text-slate-400 tracking-tight uppercase">
                    © २०८१ सजिलो साथी INC. सर्वाधिकार सुरक्षित।
                    <span className="mx-3 text-slate-200">|</span>
                    <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                    <span className="mx-3 text-slate-200">|</span>
                    <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                </p>
            </footer>
        </div>
    );
}
