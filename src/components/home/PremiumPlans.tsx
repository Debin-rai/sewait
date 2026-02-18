"use client";

import { Check, Sparkles, Zap, ShieldCheck } from "lucide-react";

export default function PremiumPlans() {
    const plans = [
        {
            name: "Basic",
            price: "Free",
            features: ["Ad-supported", "Standard Calendar", "Basic Rates"],
            icon: <Zap className="size-5 text-slate-400" />,
            current: true
        },
        {
            name: "Pro",
            price: "रु १००/mo",
            features: ["Ad-free Experience", "Priority Alerts", "Custom Reminders"],
            icon: <Sparkles className="size-5 text-amber-500" />,
            current: false,
            highlight: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            features: ["API Access", "Bulk Services", "24/7 Support"],
            icon: <ShieldCheck className="size-5 text-primary" />,
            current: false
        }
    ];

    return (
        <div className="mt-12 bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 md:p-12 border border-slate-100 dark:border-slate-800">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mb-4">SewaIT Service Plans</h2>
                <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto">Choose the plan that fits your needs. Get priority access to all our official tools and real-time data.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {plans.map((plan, idx) => (
                    <div
                        key={idx}
                        className={`relative p-8 rounded-3xl transition-all duration-500 hover:-translate-y-2 ${plan.highlight
                                ? 'bg-white dark:bg-slate-800 shadow-2xl shadow-primary/10 border-2 border-primary'
                                : 'bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700'
                            }`}
                    >
                        {plan.highlight && (
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-4 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/30">
                                Recommended
                            </div>
                        )}

                        <div className="flex items-center gap-3 mb-6">
                            <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                                {plan.icon}
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">{plan.name}</h3>
                        </div>

                        <div className="mb-6">
                            <span className="text-3xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                        </div>

                        <ul className="space-y-4 mb-8">
                            {plan.features.map((feature, fIdx) => (
                                <li key={fIdx} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                    <div className="size-5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
                                        <Check className="size-3 text-emerald-600 dark:text-emerald-400" strokeWidth={4} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <button
                            className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${plan.current
                                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-default'
                                    : 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 active:scale-95'
                                }`}
                        >
                            {plan.current ? 'Current Plan' : 'Coming Soon'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-12 text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">All plans include basic Gov Information access</p>
            </div>
        </div>
    );
}
