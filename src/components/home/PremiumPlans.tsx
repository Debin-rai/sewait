"use client";

import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function PremiumPlans() {
    const plans = [
        {
            name: "Basic",
            price: "Free",
            features: ["Ad-supported", "Standard Calendar", "Basic Rates"],
            icon: <Zap className="size-5 text-slate-400" />,
            current: true,
            color: "slate"
        },
        {
            name: "Pro",
            price: "रु १००/mo",
            features: ["Ad-free Experience", "Priority Alerts", "Custom Reminders"],
            icon: <Sparkles className="size-5 text-amber-500" />,
            current: false,
            highlight: true,
            color: "primary"
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: ["API Access", "Bulk Services", "24/7 Support"],
            icon: <ShieldCheck className="size-5 text-primary" />,
            current: false,
            color: "indigo"
        }
    ];

    return (
        <div className="mt-24 mb-12 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950 rounded-[3.5rem] p-12 md:p-20 border border-slate-100 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -top-32 -right-32 size-96 bg-primary/5 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute -bottom-32 -left-32 size-96 bg-indigo-500/5 rounded-full blur-[100px] animate-pulse delay-1000" />

            <div className="text-center mb-20 relative z-10">
                <span className="text-[11px] font-black text-primary uppercase tracking-[0.5em] mb-4 block animate-in fade-in slide-in-from-bottom-2 duration-1000">Official Service Tiers</span>
                <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 tracking-tighter leading-none animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                    SajiloSathi Service Plans <br className="hidden md:block" />
                    <span className="text-primary/20 nepali-font block mt-2">सजिलो साथी सेवा योजनाहरू</span>
                </h2>
                <div className="w-24 h-1.5 bg-primary/10 rounded-full mx-auto mb-8" />
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
                    Experience the future of digital utilities in Nepal. Elevate your daily routines with our premium official toolsets and priority access.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`group relative p-12 rounded-[3rem] transition-all duration-700 hover:-translate-y-6 ${plan.highlight
                                ? 'bg-white dark:bg-slate-800 shadow-[0_50px_100px_-30px_rgba(26,53,91,0.2)] border-2 border-primary ring-[12px] ring-primary/5'
                                : 'bg-white/40 dark:bg-slate-800/40 backdrop-blur-2xl border border-slate-100 dark:border-slate-700 hover:border-primary/20 hover:shadow-2xl hover:shadow-slate-200/50'
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-8 py-2 rounded-full uppercase tracking-[0.2em] shadow-xl shadow-primary/30 animate-bounce">
                                Most Popular
                            </div>
                        )}

                        <div className="flex items-center gap-5 mb-10">
                            <div className={`size-16 rounded-[1.5rem] flex items-center justify-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-12 ${plan.color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-slate-50 dark:bg-slate-900 text-slate-400'
                                }`}>
                                {plan.icon}
                            </div>
                            <div>
                                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-[0.15em] text-sm">{plan.name}</h3>
                                <p className="text-[10px] text-primary/40 font-black tracking-widest uppercase mt-1">Sajilo Access</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <span className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{plan.price}</span>
                            {plan.price !== 'Free' && plan.price !== 'Custom' && (
                                <span className="text-slate-400 text-xs font-black ml-2 uppercase tracking-widest">/ Mo</span>
                            )}
                        </div>

                        <div className="h-px w-full bg-slate-100 dark:bg-slate-700 mb-10" />

                        <ul className="space-y-6 mb-12">
                            {plan.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-5 text-sm text-slate-600 dark:text-slate-400 font-bold group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                    <div className={`size-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 group-hover:scale-110 ${plan.highlight ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                                        }`}>
                                        <Check className="size-4" strokeWidth={4} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`w-full py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.25em] transition-all duration-700 ${plan.current
                                    ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default border border-slate-200 dark:border-slate-700'
                                    : 'bg-primary hover:bg-primary/90 text-white shadow-2xl shadow-primary/20 hover:shadow-primary/50 hover:scale-[1.02] active:scale-95'
                                }`}
                        >
                            {plan.current ? 'Your Active Plan' : 'Get Started'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-20 text-center relative z-10">
                <div className="inline-flex items-center gap-6 px-10 py-4 bg-slate-50 dark:bg-slate-900 rounded-full border border-slate-100 dark:border-slate-800">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Official Partners</p>
                    <div className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                    <span className="text-xs font-black text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">eSewa</span>
                    <span className="text-xs font-black text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">Khalti</span>
                    <span className="text-xs font-black text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors">ConnectIPS</span>
                </div>
            </div>
        </div>
    );
}
