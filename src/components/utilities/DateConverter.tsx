"use client";

import React, { useState } from "react";
// @ts-ignore
import NepaliDate from 'nepali-date-converter';

export default function DateConverter() {
    const [conversionMode, setConversionMode] = useState<"BS_TO_AD" | "AD_TO_BS">("BS_TO_AD");
    const [inputDate, setInputDate] = useState<string>("");
    const [resultText, setResultText] = useState<string>("");
    const [resultError, setResultError] = useState<boolean>(false);

    const handleConvert = () => {
        setResultError(false);
        if (!inputDate) {
            setResultText("Please enter a valid date.");
            setResultError(true);
            return;
        }

        try {
            if (conversionMode === "BS_TO_AD") {
                // Input is BS: YYYY-MM-DD
                const parts = inputDate.split('-');
                if (parts.length !== 3) throw new Error("Format must be YYYY-MM-DD");
                const nepDate = new NepaliDate(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
                const engDate = nepDate.toJsDate();
                setResultText(engDate.toDateString());
            } else {
                // Input is AD: YYYY-MM-DD
                const jsDate = new Date(inputDate);
                const nepDate = new NepaliDate(jsDate);
                // The library month is 0-indexed, so we add 1 for display
                setResultText(`${nepDate.getYear()} / ${nepDate.getMonth() + 1} / ${nepDate.getDate()} BS`);
            }
        } catch (e: any) {
            console.error(e);
            setResultError(true);
            setResultText("Invalid date range or format.");
        }
    };

    return (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    <span className="material-symbols-outlined">event_repeat</span>
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">BS ↔ AD Converter</h3>
                    <p className="text-sm text-slate-500">Fast and accurate Nepali (BS) to English (AD) calendar conversion.</p>
                </div>
            </div>

            <div className="flex items-center gap-2 mb-6 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl max-w-sm">
                <button
                    onClick={() => { setConversionMode("BS_TO_AD"); setInputDate(""); setResultText(""); }}
                    className={`flex-1 py-1.5 px-3 text-sm font-bold rounded-lg transition-all ${conversionMode === 'BS_TO_AD' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    BS to AD
                </button>
                <button
                    onClick={() => { setConversionMode("AD_TO_BS"); setInputDate(""); setResultText(""); }}
                    className={`flex-1 py-1.5 px-3 text-sm font-bold rounded-lg transition-all ${conversionMode === 'AD_TO_BS' ? 'bg-white dark:bg-slate-700 shadow-sm text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                >
                    AD to BS
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
                        {conversionMode === "BS_TO_AD" ? "Enter Nepali Date (BS)" : "Enter English Date (AD)"}
                    </label>
                    <input
                        type={conversionMode === "BS_TO_AD" ? "text" : "date"}
                        placeholder={conversionMode === "BS_TO_AD" ? "YYYY-MM-DD (e.g., 2080-01-15)" : ""}
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none font-mono"
                    />
                </div>
                <div className="flex items-end">
                    <button
                        onClick={handleConvert}
                        className="w-full md:w-auto h-12 bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-xl font-bold transition-all shadow-md shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2"
                    >
                        Convert
                        <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                    </button>
                </div>
            </div>

            {resultText && (
                <div className={`p-4 rounded-xl border ${resultError ? 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800/50 dark:text-red-400' : 'bg-emerald-50 border-emerald-200 text-emerald-800 dark:bg-emerald-900/20 dark:border-emerald-800/50 dark:text-emerald-400'} animate-in slide-in-from-bottom-2 duration-300`}>
                    <p className="text-sm font-bold uppercase tracking-widest opacity-70 mb-1">{resultError ? 'Error' : 'Result'}</p>
                    <p className="text-xl font-black">{resultText}</p>
                </div>
            )}
        </div>
    );
}
