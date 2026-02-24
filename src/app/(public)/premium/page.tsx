"use client";

import React, { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import { useTheme, THEMES } from "@/context/ThemeContext";

export default function PremiumPage() {
    const { theme } = useTheme();
    const [transactionId, setTransactionId] = useState("");
    const [selectedPlanId, setSelectedPlanId] = useState<string>("PRO");
    const [submitting, setSubmitting] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        fetch("/api/auth/me")
            .then(res => res.json())
            .then(data => {
                if (data.authenticated) {
                    setUser(data.user);
                }
            });
    }, []);

    const plans = [
        {
            id: "FREE",
            name: "Free Citizen",
            price: "Rs. 0",
            period: "Forever",
            features: [
                "3 AI Units per day",
                "Nepali Calendar & Tithi",
                "Standard Gov Guides",
                "Basic AI Support",
                "Ad-supported"
            ],
            button: "Default Plan",
            current: !user || user.plan === "FREE",
        },
        {
            id: "PRO",
            name: "Monthly Pro",
            price: "Rs. 400",
            period: "per month",
            features: [
                "120 AI Units per month",
                "Ad-free Experience",
                "Document History & Saving",
                "1 AI Revision per doc",
                "Priority Assistance"
            ],
            button: "Upgrade to Pro",
            premium: true,
            highlight: "Most Popular",
            current: user?.plan === "PRO",
        },
        {
            id: "BUSINESS",
            name: "Business / Yearly",
            price: "Rs. 3600",
            period: "per year",
            features: [
                "800 AI Units per year",
                "Bulk Document Drafting",
                "Priority Processing Queue",
                "Dedicated Account Support",
                "Premium Formatting"
            ],
            button: "Get Business Plan",
            premium: true,
            current: user?.plan === "BUSINESS",
        }
    ];

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!transactionId || submitting) return;
        if (!user) {
            alert("Please sign in to upgrade your account.");
            return;
        }

        setSubmitting(true);
        setErrorMessage("");
        
        try {
            const res = await fetch("/api/premium/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    transactionId, 
                    planRequested: selectedPlanId 
                }),
            });
            const data = await res.json();
            
            if (res.ok) {
                setStatus("success");
                setTransactionId("");
            } else {
                setStatus("error");
                setErrorMessage(data.error || "Failed to submit request.");
            }
        } catch (err) {
            setStatus("error");
            setErrorMessage("Connection error. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] py-16 md:py-24">
            <div className="container mx-auto px-6">
                <header className="text-center mb-16 max-w-2xl mx-auto">
                    <FadeIn>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight" style={{ color: THEMES[theme].primary }}>
                            Upgrade to <span className="text-accent-amber">Premium</span>
                        </h1>
                        <p className="text-slate-600 font-medium text-lg">
                            Empowering your digital life with unlimited potential. 
                            Choose the plan that fits your professional needs.
                        </p>
                    </FadeIn>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
                    {plans.map((plan, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <div className={`
                                h-full p-10 rounded-[2.5rem] border bg-white relative flex flex-col transition-all duration-500 hover:shadow-2xl
                                ${plan.premium ? 'border-primary/20 shadow-xl shadow-primary/5' : 'border-slate-100 shadow-sm'}
                                ${plan.current ? 'ring-4 ring-offset-4' : ''}
                                ${!plan.current && selectedPlanId === plan.id ? 'ring-2 ring-primary ring-offset-2' : ''}
                            `} style={{ 
                                borderColor: plan.premium ? `${THEMES[theme].primary}30` : undefined,
                                ringColor: THEMES[theme].primary
                            } as any}>
                                {plan.highlight && (
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accent-amber text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">
                                        {plan.highlight}
                                    </span>
                                )}

                                <div className="mb-10">
                                    <h3 className="text-xl font-black text-slate-900 mb-2">{plan.name}</h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black" style={{ color: THEMES[theme].primary }}>{plan.price}</span>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{plan.period}</span>
                                    </div>
                                </div>

                                <ul className="space-y-5 mb-12 flex-1">
                                    {plan.features.map((feat, j) => (
                                        <li key={j} className="flex items-start gap-3 text-sm font-bold text-slate-600">
                                            <span className="material-symbols-outlined text-green-500 text-xl">check_circle</span>
                                            {feat}
                                        </li>
                                    ))}
                                </ul>

                                <button 
                                    onClick={() => !plan.current && setSelectedPlanId(plan.id)}
                                    disabled={plan.current}
                                    className={`
                                        w-full py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all
                                        ${plan.current
                                            ? 'bg-slate-100 text-slate-400 cursor-default'
                                            : selectedPlanId === plan.id 
                                                ? 'bg-primary text-white scale-[1.02] shadow-2xl' 
                                                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}
                                    `}
                                    style={{ 
                                        backgroundColor: plan.current ? undefined : (selectedPlanId === plan.id ? THEMES[theme].primary : undefined),
                                        boxShadow: (selectedPlanId === plan.id && !plan.current) ? `0 20px 25px -5px ${THEMES[theme].primary}20` : undefined
                                    }}
                                >
                                    {plan.current ? 'Your Active Plan' : (selectedPlanId === plan.id ? 'Plan Selected' : 'Select Plan')}
                                </button>
                            </div>
                        </FadeIn>
                    ))}
                </div>

                {/* Manual Payment Verification Section */}
                <FadeIn delay={0.4}>
                    <div id="verify-form" className="max-w-5xl mx-auto bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* QR Codes Side */}
                            <div className="p-10 md:p-16 border-b md:border-b-0 md:border-r border-slate-100 bg-slate-50/50">
                                <h2 className="text-2xl font-black mb-8 tracking-tight" style={{ color: THEMES[theme].primary }}>How to Upgrade</h2>
                                <div className="space-y-10">
                                    <div className="flex gap-6 items-center">
                                        <div className="size-24 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center font-black text-xs text-center" style={{ color: THEMES[theme].primary }}>
                                            eSewa <br/> MERCHANT QR
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-slate-800">1. Scan & Pay</p>
                                            <p className="text-sm text-slate-500 font-medium">Use eSewa or Khalti to pay the exact plan amount to our official merchant account.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-6 items-center">
                                        <div className="size-24 bg-white p-3 rounded-2xl shadow-lg border border-slate-100 flex items-center justify-center font-black text-xs text-center text-[#612d91]">
                                            Khalti <br/> MERCHANT QR
                                        </div>
                                        <div>
                                            <p className="text-base font-bold text-slate-800">2. Submit Reference</p>
                                            <p className="text-sm text-slate-500 font-medium">Copy the Transaction ID from your payment receipt and paste it here.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-12 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                                    <p className="text-xs text-blue-700 font-bold leading-relaxed">
                                        <span className="material-symbols-outlined text-sm align-middle mr-1">info</span>
                                        <strong>TRUST & PRIVACY:</strong> We use manual verification to keep our platform low-friction and secure. Your account will be upgraded within 2-4 hours.
                                    </p>
                                </div>
                            </div>

                            {/* Verification Form */}
                            <div className="p-10 md:p-16 flex flex-col justify-center">
                                <h2 className="text-2xl font-black mb-8 tracking-tight" style={{ color: THEMES[theme].primary }}>Verify Payment</h2>
                                <form onSubmit={handleVerify} className="space-y-8">
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Selected Plan</label>
                                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-bold text-slate-700 flex justify-between items-center">
                                            <span>{plans.find(p => p.id === selectedPlanId)?.name}</span>
                                            <span style={{ color: THEMES[theme].primary }}>{plans.find(p => p.id === selectedPlanId)?.price}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pl-1">Transaction / Reference ID</label>
                                        <input
                                            type="text"
                                            value={transactionId}
                                            onChange={(e) => setTransactionId(e.target.value)}
                                            placeholder="e.g. 5X89AB22"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-base font-bold focus:ring-4 focus:ring-primary/5 outline-none transition-all"
                                            style={{ "--ring-color": THEMES[theme].primary } as any}
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className="w-full text-white py-5 rounded-2xl font-black uppercase text-xs tracking-widest transition-all shadow-xl active:scale-95 disabled:opacity-50"
                                        style={{ 
                                            backgroundColor: THEMES[theme].primary,
                                            boxShadow: `0 20px 25px -5px ${THEMES[theme].primary}20`
                                        }}
                                    >
                                        {submitting ? "Processing Request..." : "Verify & Upgrade Now"}
                                    </button>

                                    {status === "success" && (
                                        <div className="flex items-center gap-4 p-6 bg-emerald-50 text-emerald-700 rounded-3xl border border-emerald-100 animate-in zoom-in-95">
                                            <span className="material-symbols-outlined text-2xl">verified</span>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-tight">Request Submitted</p>
                                                <p className="text-xs font-medium opacity-80">Our team is verifying your payment. You will receive a notification shortly.</p>
                                            </div>
                                        </div>
                                    )}

                                    {status === "error" && (
                                        <div className="flex items-center gap-4 p-6 bg-red-50 text-red-700 rounded-3xl border border-red-100 animate-in zoom-in-95">
                                            <span className="material-symbols-outlined text-2xl">error</span>
                                            <div>
                                                <p className="text-sm font-black uppercase tracking-tight">Submission Error</p>
                                                <p className="text-xs font-medium opacity-80">{errorMessage}</p>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
