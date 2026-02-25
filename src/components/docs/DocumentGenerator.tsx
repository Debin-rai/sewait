import React, { useState, useEffect } from "react";
import FadeIn from "@/components/animations/FadeIn";
import ReactMarkdown from "react-markdown";
import { downloadAsPDF } from "@/lib/pdf-utils";
import Link from "next/link";

const DOC_TYPES = [
    { id: "nibedan", label: "General Application (Nibedan)", icon: "description", desc: "For wards, municipalities, or offices." },
    { id: "character", label: "Character/Job Letter", icon: "assignment_ind", desc: "For job applications or institutional proof." },
    { id: "leave", label: "Leave Application", icon: "event_busy", desc: "For schools, colleges, or workplaces." },
    { id: "custom", label: "Custom Formal Letter", icon: "edit_note", desc: "Draft any specific formal document." },
];

export default function DocumentGenerator() {
    const [step, setStep] = useState(1);
    const [docType, setDocType] = useState("");
    const [details, setDetails] = useState("");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState("");
    const [user, setUser] = useState<any>(null);
    const [authChecked, setAuthChecked] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch("/api/auth/me");
                const data = await res.json();
                if (data.authenticated) {
                    setUser(data.user);
                }
            } catch (err) {
                console.error("Auth check failed:", err);
            } finally {
                setAuthChecked(true);
            }
        };
        checkAuth();
    }, []);

    const handleGenerate = async () => {
        if (!user) {
            setErrorMessage("Please login to generate official documents.");
            return;
        }

        setErrorMessage("");
        setLoading(true);
        setStep(3);
        try {
            const res = await fetch("/api/doc-gen", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: docType, details }),
            });
            const data = await res.json();

            if (!res.ok) {
                setErrorMessage(data.message || data.error);
                setStep(2); // Go back to details to show error
                return;
            }

            setResult(data.content);
            setStep(4);
        } catch (error) {
            console.error(error);
            setErrorMessage("An error occurred while generating the document. Please try again.");
            setStep(2);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(result);
        alert("Document copied to clipboard!");
    };

    const handleDownloadPDF = () => {
        downloadAsPDF("generated-document", `SewaIT_Document_${Date.now()}`);
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-slate-100 pb-8">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-3xl">auto_fix_high</span>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">SewaIT AI Document Generator</h1>
                        <p className="text-sm text-slate-500 font-medium whitespace-nowrap">Instant Professional Nepali Government Documents</p>
                    </div>
                </div>

                {authChecked && (
                    <div className="flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-3 bg-white border border-slate-100 px-4 py-2 rounded-2xl shadow-sm">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                    {user.name?.[0] || user.email[0].toUpperCase()}
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-0.5">{user.subscriptionStatus === 'PREMIUM' ? 'Premium Member' : 'Free Member'}</p>
                                    <p className="text-xs font-bold text-slate-800 leading-none">{user.name || user.email.split('@')[0]}</p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2">
                                <Link href="/login" className="text-xs font-bold text-slate-600 hover:text-primary transition-colors px-4 py-2">Log In</Link>
                                <Link href="/register" className="text-xs font-bold bg-primary text-white px-4 py-2 rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">Sign Up</Link>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Stepper */}
            <div className="flex items-center justify-between mb-12 relative px-4">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 -z-10" />
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${step >= s ? "bg-primary text-white scale-110 shadow-lg" : "bg-white border-2 border-slate-200 text-slate-400"}`}>
                            {step > s ? <span className="material-symbols-outlined text-sm">check</span> : s}
                        </div>
                    </div>
                ))}
            </div>

            {/* Error Message */}
            {errorMessage && (
                <FadeIn>
                    <div className="mb-6 p-6 bg-amber-50 border-2 border-amber-100 rounded-[2rem] text-amber-900 text-sm font-bold flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-amber-200/20">
                        <div className="flex items-center gap-4 text-center md:text-left">
                            <div className="size-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-2xl">info</span>
                            </div>
                            <p className="leading-relaxed">{errorMessage}</p>
                        </div>
                        <div className="flex items-center gap-3 w-full md:w-auto">
                            {errorMessage.includes("login") ? (
                                <Link href="/login" className="flex-1 md:flex-none text-center bg-amber-500 text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-amber-600 transition-all">Go to Login</Link>
                            ) : errorMessage.toLowerCase().includes("reached") || errorMessage.toLowerCase().includes("finished") ? (
                                <Link href="/premium" className="flex-1 md:flex-none text-center bg-primary text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">Upgrade Now</Link>
                            ) : null}
                        </div>
                    </div>
                </FadeIn>
            )}

            {/* Step 1: Choose Type */}
            {step === 1 && (
                <FadeIn>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {DOC_TYPES.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => { setDocType(type.id); setStep(2); setErrorMessage(""); }}
                                className="group p-6 bg-white border border-slate-100 rounded-2xl text-left hover:border-primary hover:shadow-xl transition-all"
                            >
                                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-500 group-hover:bg-primary group-hover:text-white transition-all mb-4">
                                    <span className="material-symbols-outlined">{type.icon}</span>
                                </div>
                                <h3 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{type.label}</h3>
                                <p className="text-xs text-slate-500 mt-1">{type.desc}</p>
                            </button>
                        ))}
                    </div>
                </FadeIn>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
                <FadeIn>
                    <div className="bg-white p-6 md:p-8 border border-slate-100 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary">edit</span>
                            Enter Details for {DOC_TYPES.find(t => t.id === docType)?.label}
                        </h3>
                        <textarea
                            value={details}
                            onChange={(e) => setDetails(e.target.value)}
                            placeholder="Example: I want an application for a character certificate. Name: Ram Bahadur, Ward No: 5, Kathmandu. Reason: Job Application."
                            className={`w-full h-48 p-4 bg-slate-50 border rounded-xl focus:ring-2 focus:ring-primary/20 focus:outline-none text-slate-700 text-sm mb-6 resize-none transition-all ${errorMessage ? 'border-orange-200 ring-2 ring-orange-50' : 'border-slate-100'}`}
                        />
                        <div className="flex items-center gap-3">
                            <button onClick={() => { setStep(1); setErrorMessage(""); }} className="px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50">Back</button>
                            <button
                                onClick={handleGenerate}
                                disabled={!details.trim() || loading}
                                className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined">auto_fix_high</span>
                                        Generate Document
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </FadeIn>
            )}

            {/* Step 3: Generating */}
            {step === 3 && (
                <div className="py-20 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 border-4 border-primary/10 border-t-primary rounded-full animate-spin mb-6" />
                    <h3 className="text-xl font-bold text-slate-900 mb-2">SewaIT AI is Drafting...</h3>
                    <p className="text-sm text-slate-500">Generating your formal document in professional Nepali format.</p>
                </div>
            )}

            {/* Step 4: Result */}
            {step === 4 && (
                <FadeIn>
                    <div className="bg-white p-6 md:p-8 border border-slate-100 rounded-2xl shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-900 flex items-center gap-2">
                                <span className="material-symbols-outlined text-green-500">verified</span>
                                Generated Document
                            </h3>
                            <div className="flex gap-2">
                                <button onClick={handleCopy} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 shadow-sm transition-all" title="Copy to Clipboard">
                                    <span className="material-symbols-outlined">content_copy</span>
                                </button>
                                <button onClick={handleDownloadPDF} className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 shadow-sm transition-all" title="Download PDF">
                                    <span className="material-symbols-outlined">picture_as_pdf</span>
                                </button>
                            </div>
                        </div>
                        <div id="generated-document" className="bg-white p-8 rounded-xl border border-slate-100 text-slate-900 font-medium leading-relaxed prose prose-slate max-w-none">
                            <ReactMarkdown>{result}</ReactMarkdown>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-50">
                            <button
                                onClick={() => { setStep(1); setResult(""); setDetails(""); setErrorMessage(""); }}
                                className="flex-1 py-3 px-4 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-bold hover:border-primary hover:text-primary transition-all flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined">history_edu</span>
                                Draft Another Document
                            </button>
                            {user && user.subscriptionStatus !== 'PREMIUM' && (
                                <Link
                                    href="/premium"
                                    className="flex-1 py-3 px-4 rounded-xl bg-amber-500 text-white font-bold shadow-lg shadow-amber-200 hover:bg-amber-600 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined">workspace_premium</span>
                                    Get Unlimited Access
                                </Link>
                            )}
                        </div>
                    </div>
                </FadeIn>
            )}
        </div>
    );
}
