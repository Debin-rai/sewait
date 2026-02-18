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
            theme: "slate"
        },
        {
            name: "Pro",
            price: "रु १००/mo",
            features: ["Ad-free Experience", "Priority Alerts", "Custom Reminders"],
            icon: <Sparkles className="size-5 text-amber-500" />,
            current: false,
            highlight: true,
            theme: "blue"
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: ["API Access", "Bulk Services", "24/7 Support"],
            icon: <ShieldCheck className="size-5 text-indigo-500" />,
            current: false,
            theme: "indigo"
        }
    ];

    const getThemeClasses = (theme: string, highlight?: boolean) => {
        if (highlight) {
            return "bg-white dark:bg-slate-900 border-primary shadow-xl shadow-primary/10 ring-1 ring-primary/20 scale-105 z-10";
        }
        return "bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all";
    };

    return (
        <section className="py-20 bg-slate-50 dark:bg-slate-950 px-4">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                        Choose Your <span className="text-primary">Experience</span>
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 font-medium max-w-2xl mx-auto">
                        Transparent pricing for a streamlined utility experience. No hidden fees, just reliable service.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-8">
                    {plans.map((plan, idx) => (
                        <div
                            key={idx}
                            className={`relative flex flex-col p-8 rounded-[2.5rem] border ${getThemeClasses(plan.theme, plan.highlight)}`}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/30">
                                    Most Popular
                                </div>
                            )}

                            <div className="flex items-center justify-between mb-8">
                                <div className={`p-3 rounded-2xl ${plan.highlight ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800'}`}>
                                    {plan.icon}
                                </div>
                                <span className="text-xs font-black uppercase tracking-widest text-slate-400">{plan.name} Access</span>
                            </div>

                            <div className="mb-8">
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                                    {plan.price !== "Free" && plan.price !== "Custom" && (
                                        <span className="text-sm font-bold text-slate-500">/ mo</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4 mb-10 flex-grow">
                                {plan.features.map((feature, fIdx) => (
                                    <div key={fIdx} className="flex items-center gap-3">
                                        <div className={`size-5 rounded-full flex items-center justify-center ${plan.highlight ? 'bg-green-500/10 text-green-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                            <Check className="size-3 stroke-[4]" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.current
                                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-default'
                                        : plan.highlight
                                            ? 'bg-primary text-white shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95'
                                            : 'bg-slate-900 dark:bg-white dark:text-slate-900 text-white hover:bg-slate-800'
                                    }`}
                            >
                                {plan.current ? "Your Active Plan" : "Get Started"}
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-slate-100 dark:border-slate-800 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Trusted by individual users across Nepal</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 opacity-40 grayscale pointer-events-none">
                        <span className="text-lg font-black tracking-tighter">ESTD. 2024</span>
                        <div className="size-1.5 rounded-full bg-slate-300"></div>
                        <span className="text-lg font-black tracking-tighter uppercase">Community Driven</span>
                        <div className="size-1.5 rounded-full bg-slate-300"></div>
                        <span className="text-lg font-black tracking-tighter uppercase">Secure Tooling</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
