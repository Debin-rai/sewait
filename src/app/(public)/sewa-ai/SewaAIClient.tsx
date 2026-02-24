"use client";

import { useState, useEffect, useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import StreamingText from "@/components/animations/StreamingText";
import Link from "next/link";
import { Menu, X, Plus, History, ArrowLeft, Send, Mic, Paperclip, Share2, Bot, User, FileText, Calendar, Cloud } from "lucide-react";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
    isNew?: boolean; // For streaming animation
}

export default function SewaAIClient() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<{ id: string, title: string, createdAt: string }[]>([]);
    const [isHistoryOpen, setIsHistoryOpen] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const fetchHistory = async () => {
        try {
            const res = await fetch("/api/sewait-portal-99/chat");
            const data = await res.json();
            setChatHistory(data.sessions || []);
        } catch (error) {
            console.error("Failed to fetch history:", error);
        }
    };

    // Initialize with welcome message and load history
    useEffect(() => {
        const savedMessages = localStorage.getItem("sewa_ai_messages");
        if (savedMessages) {
            const parsed = JSON.parse(savedMessages);
            setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp), isNew: false })));
        } else {
            setMessages([
                {
                    role: "assistant",
                    content: "Namaste! I'm Sewa AI, your personal guide to everything Nepali. I can help you with government service guides, weather updates, or even explain complex government procedures.\n\nHow can I assist you today?",
                    timestamp: new Date(),
                    isNew: true
                },
            ]);
        }

        fetchHistory();
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            const scrollContainer = scrollRef.current;
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: messages.length <= 1 ? "auto" : "smooth"
            });
        }
        if (messages.length > 0) {
            localStorage.setItem("sewa_ai_messages", JSON.stringify(messages.map(m => ({ ...m, isNew: false }))));
        }
    }, [messages]);

    const handleSend = async (text: string = input) => {
        if (!text.trim() || isLoading) return;

        const userMessage: Message = {
            role: "user",
            content: text,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch("/api/sewa-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: [...messages, userMessage].map((m) => ({
                        role: m.role,
                        content: m.content,
                    })),
                    sessionId,
                }),
            });

            const data = await res.json();
            
            if (res.status === 401) {
                setMessages((prev) => [...prev, {
                    role: "assistant",
                    content: "Please sign in to use Sewa AI. Free accounts get 3 units/day.",
                    timestamp: new Date(),
                    isNew: true
                }]);
                return;
            }

            if (res.status === 403) {
                setMessages((prev) => [...prev, {
                    role: "assistant",
                    content: data.error || "Daily limit reached.",
                    timestamp: new Date(),
                    isNew: true
                }]);
                return;
            }

            if (data.error) throw new Error(data.error);

            if (data.sessionId && !sessionId) {
                setSessionId(data.sessionId);
                fetchHistory();
            }

            const aiMessage: Message = {
                role: "assistant",
                content: data.message.content,
                timestamp: new Date(),
                isNew: true
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: `Sorry, I encountered an error: ${error.message}. Please make sure the AI API key is configured in Admin Settings.`,
                    timestamp: new Date(),
                    isNew: true
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHistoryClick = async (session: any) => {
        setIsLoading(true);
        setIsHistoryOpen(false);
        try {
            const res = await fetch(`/api/sewait-portal-99/chat/${session.id}`);
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages.map((m: any) => ({
                    role: m.role,
                    content: m.content,
                    timestamp: new Date(m.createdAt),
                    isNew: false
                })));
                setSessionId(session.id);
            }
        } catch (error) {
            console.error("Failed to load session:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        const initialMessage: Message = {
            role: "assistant",
            content: "Namaste! I'm Sewa AI, your personal guide to everything Nepali. I can help you with government service guides, weather updates, or even explain complex government procedures.\n\nHow can I assist you today?",
            timestamp: new Date(),
            isNew: true
        };
        setMessages([initialMessage]);
        setSessionId(null);
        localStorage.removeItem("sewa_ai_messages");
        setIsHistoryOpen(false);
    };

    const quickActions = [
        { label: "Passport Guide", icon: <FileText className="size-4" /> },
        { label: "Today's Tithi", icon: <Calendar className="size-4" /> },
        { label: "Weather Update", icon: <Cloud className="size-4" /> },
    ];

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-white dark:bg-slate-950 overflow-hidden fixed inset-0 z-[100]">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-80 bg-slate-50 dark:bg-slate-900/50 border-r border-slate-200 dark:border-slate-800 p-6">
                <Link
                    href="/"
                    className="flex items-center gap-3 p-3 rounded-2xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all text-left mb-6 font-bold"
                >
                    <ArrowLeft className="size-5" />
                    Back to Home
                </Link>

                <button
                    onClick={clearChat}
                    className="w-full bg-primary hover:bg-primary-dark text-white font-black py-4 px-6 rounded-2xl flex items-center justify-center gap-3 mb-8 transition-all shadow-xl shadow-primary/20 active:scale-95"
                >
                    <Plus className="size-5" strokeWidth={3} />
                    NEW CHAT
                </button>

                <div className="flex-1 overflow-y-auto space-y-8 no-scrollbar">
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4 px-2">Recent Sessions</h3>
                        <div className="space-y-1">
                            {chatHistory.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleHistoryClick(item)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-white dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all text-left group ${sessionId === item.id ? 'bg-white dark:bg-slate-800 shadow-sm ring-1 ring-primary/10' : ''}`}
                                >
                                    <div className={`p-2 rounded-xl transition-colors ${sessionId === item.id ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-700 text-slate-400 group-hover:bg-primary/5 group-hover:text-primary'}`}>
                                        <History className="size-4" />
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 tracking-tighter uppercase mb-0.5">#{item.id.substring(item.id.length - 8).toUpperCase()}</span>
                                        <span className="text-xs font-bold truncate pr-2">{item.title}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all text-left">
                        <Bot className="size-5" />
                        <span className="text-xs font-bold tracking-tight">Debin C. Rai • Sewa AI v2.0</span>
                    </button>
                </div>
            </aside>

            {/* Mobile History Drawer Overlay */}
            {isHistoryOpen && (
                <div className="lg:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] animate-in fade-in duration-300" onClick={() => setIsHistoryOpen(false)}>
                    <div
                        className="absolute left-0 top-0 bottom-0 w-[85%] max-w-[320px] bg-white dark:bg-slate-900 p-6 shadow-2xl animate-in slide-in-from-left duration-500 ease-out"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tighter">History</h2>
                            <button onClick={() => setIsHistoryOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400">
                                <X size={20} />
                            </button>
                        </div>

                        <button
                            onClick={clearChat}
                            className="w-full bg-primary text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 mb-8 shadow-lg shadow-primary/20"
                        >
                            <Plus size={20} strokeWidth={3} />
                            NEW CHAT
                        </button>

                        <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-250px)] no-scrollbar">
                            {chatHistory.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleHistoryClick(item)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 border ${sessionId === item.id ? 'border-primary bg-primary/5' : 'border-slate-100 dark:border-slate-800'}`}
                                >
                                    <History className="size-5 text-slate-400" />
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] font-black text-slate-400 uppercase">#{item.id.substring(item.id.length - 8).toUpperCase()}</span>
                                        <span className="text-sm font-bold truncate text-slate-700 dark:text-slate-200">{item.title}</span>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="absolute bottom-10 left-6 right-6">
                            <Link href="/" className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                                <ArrowLeft size={18} />
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative h-full">
                {/* Chat Header */}
                <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 h-20 flex items-center justify-between z-10 shrink-0">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="lg:hidden p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-primary transition-all flex items-center gap-1">
                            <ArrowLeft size={18} strokeWidth={3} />
                            <span className="text-[10px] font-black uppercase tracking-tighter">Back</span>
                        </Link>
                        <button onClick={() => setIsHistoryOpen(true)} className="lg:hidden p-2 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-500 hover:text-primary transition-all">
                            <Menu size={22} strokeWidth={2.5} />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="size-11 bg-primary/10 rounded-2xl flex items-center justify-center overflow-hidden border border-primary/10">
                                <Bot className="text-primary size-6 animate-pulse" />
                            </div>
                            <div className="hidden xs:block">
                                <h2 className="text-base font-black text-slate-900 dark:text-white tracking-tight -mb-1 text-left">Sewa AI</h2>
                                <div className="flex items-center gap-1.5">
                                    <div className="size-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active • v2.0</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="hidden sm:flex size-10 items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all">
                            <Share2 size={18} />
                        </button>
                        <button className="hidden sm:flex size-10 items-center justify-center bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-primary transition-all" onClick={clearChat}>
                            <Plus size={20} strokeWidth={3} />
                        </button>
                    </div>
                </header>

                {/* Messages Container */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto px-4 pt-8 md:px-10 space-y-8 scroll-smooth pb-52 touch-pan-y"
                >
                    {messages.map((m, i) => (
                        <FadeIn key={i} delay={0} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`flex gap-4 max-w-[92%] md:max-w-[80%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                <div className={`size-10 md:size-12 rounded-[1.2rem] flex items-center justify-center flex-shrink-0 shadow-lg ${m.role === "user" ? "bg-primary text-white shadow-primary/20" : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-primary shadow-slate-200/50 dark:shadow-none"
                                    }`}>
                                    {m.role === "user" ? <User size={20} strokeWidth={2.5} /> : <Bot size={20} strokeWidth={2.5} />}
                                </div>
                                <div className="flex flex-col">
                                    <div className={`p-5 rounded-[1.8rem] text-[15px] leading-relaxed relative ${m.role === "user"
                                        ? "bg-primary text-white font-bold rounded-tr-none shadow-xl shadow-primary/20"
                                        : "bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-100 font-bold rounded-tl-none border border-slate-100/50 dark:border-slate-700/50"
                                        }`}>
                                        {m.role === "assistant" && m.isNew ? (
                                            <StreamingText text={m.content} speed={10} />
                                        ) : (
                                            m.content
                                        )}
                                    </div>
                                    <span className={`text-[9px] font-black mt-2 uppercase tracking-widest ${m.role === "user" ? "text-right mr-2 text-primary" : "text-left ml-2 text-slate-400"}`}>
                                        {m.role === "user" ? "YOU" : "SEWA AI"} • {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex gap-4">
                                <div className="size-10 md:size-12 rounded-[1.2rem] bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-primary flex items-center justify-center shadow-lg shadow-slate-200/50">
                                    <Bot className="animate-bounce size-5" />
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl flex gap-1.5 items-center">
                                    <div className="size-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="size-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="size-1.5 bg-primary/40 rounded-full animate-bounce" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sticky Input Bar */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 md:p-8 md:pb-12 bg-gradient-to-t from-white dark:from-slate-950 via-white/95 dark:via-slate-950/95 via-40% to-transparent z-10">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Quick Actions - Only show if conversation hasn't really started */}
                        {messages.length <= 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar px-1">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(action.label)}
                                        className="flex items-center gap-2.5 px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl text-[11px] font-black text-slate-700 dark:text-slate-300 hover:border-primary hover:text-primary dark:hover:text-primary transition-all whitespace-nowrap shadow-sm active:scale-95"
                                    >
                                        <div className="text-primary">{action.icon}</div>
                                        {action.label.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Refined Input Bar */}
                        <div className="flex items-end gap-3 glass-morphism-dark">
                            <div className="flex-1 group relative flex items-center">
                                <div className="absolute left-4 size-10 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-400 group-focus-within:text-primary transition-colors cursor-pointer hover:bg-slate-200">
                                    <Paperclip size={18} />
                                </div>
                                <textarea
                                    rows={1}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                    placeholder="Type your message..."
                                    className="w-full bg-slate-50/50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] pl-16 pr-14 py-4 text-[15px] font-bold focus:ring-4 focus:ring-primary/5 focus:border-primary/50 outline-none transition-all resize-none shadow-sm dark:text-white"
                                />
                                <button className="absolute right-4 text-slate-400 hover:text-primary transition-colors">
                                    <Mic size={22} />
                                </button>
                            </div>
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading}
                                className="size-14 bg-primary text-white rounded-[1.6rem] flex items-center justify-center hover:bg-primary-dark transition-all shadow-xl shadow-primary/30 disabled:opacity-40 disabled:shadow-none active:scale-90"
                            >
                                <Send size={24} strokeWidth={2.5} />
                            </button>
                        </div>

                        <p className="text-[10px] text-center font-black text-slate-400 dark:text-slate-600 uppercase tracking-widest">
                            Sewa AI can make mistakes • Created by <span className="text-slate-600 dark:text-slate-400">Debin C. Rai</span>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
