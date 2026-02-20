"use client";

import React, { useState } from "react";

// Fallback rates if API or DB fails (Manual configuration base)
const DEFAULT_RATES = {
    USD: 133.50,
    EUR: 145.20,
    GBP: 168.45,
    AUD: 87.15,
};

export default function ForexConverter() {
    const [amount, setAmount] = useState<number | "">(1);
    const [fromCurrency, setFromCurrency] = useState<keyof typeof DEFAULT_RATES | "NPR">("USD");
    const [toCurrency, setToCurrency] = useState<keyof typeof DEFAULT_RATES | "NPR">("NPR");
    const [rates, setRates] = useState<Record<string, number>>(DEFAULT_RATES);
    const [loading, setLoading] = useState(true);

    React.useEffect(() => {
        fetch('/api/settings?group=FOREX')
            .then(res => res.json())
            .then(data => {
                if (Object.keys(data).length > 0) {
                    setRates({
                        USD: Number(data.FOREX_USD) || DEFAULT_RATES.USD,
                        EUR: Number(data.FOREX_EUR) || DEFAULT_RATES.EUR,
                        GBP: Number(data.FOREX_GBP) || DEFAULT_RATES.GBP,
                        AUD: Number(data.FOREX_AUD) || DEFAULT_RATES.AUD,
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch settings", err);
                setLoading(false);
            });
    }, []);

    const handleSwap = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const calculateResult = () => {
        if (!amount) return "0.00";

        let inNpr = 0;

        // Convert FROM currency to NPR
        if (fromCurrency === "NPR") {
            inNpr = Number(amount);
        } else {
            inNpr = Number(amount) * rates[fromCurrency as keyof typeof rates];
        }

        // Convert NPR to TO currency
        if (toCurrency === "NPR") {
            return inNpr.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        } else {
            const finalValue = inNpr / rates[toCurrency as keyof typeof rates];
            return finalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <span className="material-symbols-outlined">currency_exchange</span>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">Currency Converter</h3>
                    <p className="text-sm text-slate-500">Foreign Exchange Rates to Nepali Rupees (NPR).</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <div className="w-full flex-1">
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Amount</label>
                    <div className="relative">
                        <input
                            type="number"
                            min="0"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value ? Number(e.target.value) : "")}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-4 pr-16 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none font-bold text-lg"
                        />
                        <div className="absolute inset-y-0 right-2 flex items-center">
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value as any)}
                                className="h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-slate-500 sm:text-sm rounded-md focus:ring-0 cursor-pointer font-bold"
                            >
                                <option value="NPR">NPR</option>
                                {Object.keys(DEFAULT_RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center md:pt-6">
                    <button
                        onClick={handleSwap}
                        className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined">swap_horiz</span>
                    </button>
                </div>

                <div className="w-full flex-1">
                    <label className="block text-xs font-bold text-slate-500 mb-1 uppercase tracking-wide">Converted</label>
                    <div className="relative bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 flex items-center justify-between">
                        <span className="font-black text-xl text-slate-900 dark:text-white truncate">{calculateResult()}</span>
                        <select
                            value={toCurrency}
                            onChange={(e) => setToCurrency(e.target.value as any)}
                            className="py-0 pl-2 pr-7 border-transparent bg-transparent text-slate-500 sm:text-sm rounded-md focus:ring-0 cursor-pointer font-bold ml-2"
                        >
                            <option value="NPR">NPR</option>
                            {Object.keys(DEFAULT_RATES).map(curr => <option key={curr} value={curr}>{curr}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2 justify-center text-xs font-medium text-slate-400 bg-slate-50 dark:bg-slate-800/50 py-2 rounded-lg border border-slate-100 dark:border-slate-800">
                <span className="material-symbols-outlined text-[14px]">info</span>
                Rates are indicative and based on SewaIT configurations.
            </div>
        </div>
    );
}
