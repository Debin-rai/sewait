"use client";

import { useState, useEffect, useRef } from "react";
import FadeIn from "@/components/animations/FadeIn";
import Link from "next/link";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

export default function SewaAIClient() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [chatHistory, setChatHistory] = useState<{ id: string, title: string, createdAt: string }[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize with welcome message and load history
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch("/api/sewait-portal-99/chat");
                const data = await res.json();
                setChatHistory(data.sessions || []);
            } catch (error) {
                console.error("Failed to fetch history:", error);
            }
        };

        const savedMessages = localStorage.getItem("sewa_ai_messages");
        if (savedMessages) {
            const parsed = JSON.parse(savedMessages);
            setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
        } else {
            setMessages([
                {
                    role: "assistant",
                    content: "Namaste! I'm Sewa AI, your personal guide to everything Nepali. I can help you with gold rates, public service guides, weather updates, or even explain complex government procedures.\n\nHow can I assist you today?",
                    timestamp: new Date(),
                },
            ]);
        }

        fetchHistory();
    }, []);

    // Scroll to bottom when messages change
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
        if (messages.length > 0) {
            localStorage.setItem("sewa_ai_messages", JSON.stringify(messages));
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
            if (data.error) throw new Error(data.error);

            if (data.sessionId && !sessionId) {
                setSessionId(data.sessionId);
            }

            const aiMessage: Message = {
                role: "assistant",
                content: data.message.content,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, aiMessage]);
        } catch (error: any) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: `Sorry, I encountered an error: ${error.message}. Please make sure the AI API key is configured in Admin Settings.`,
                    timestamp: new Date(),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleHistoryClick = async (session: any) => {
        setIsLoading(true);
        try {
            // In a real app, you'd have an API to get full transcript for a session
            // For now, we'll try to fetch messages for this session
            const res = await fetch(`/api/sewait-portal-99/chat/${session.id}`);
            const data = await res.json();
            if (data.messages) {
                setMessages(data.messages.map((m: any) => ({
                    role: m.role,
                    content: m.content,
                    timestamp: new Date(m.createdAt)
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
            content: "Namaste! I'm Sewa AI, your personal guide to everything Nepali. I can help you with gold rates, public service guides, weather updates, or even explain complex government procedures.\n\nHow can I assist you today?",
            timestamp: new Date(),
        };
        setMessages([initialMessage]);
        setSessionId(null);
        localStorage.removeItem("sewa_ai_messages");
    };

    const quickActions = [
        { label: "Check Gold Rates", icon: "payments" },
        { label: "Today's Tithi", icon: "calendar_month" },
        { label: "Passport Guide", icon: "description" },
        { label: "Weather Update", icon: "partly_cloudy_day" },
    ];

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-slate-50 overflow-hidden fixed inset-0 z-[100]">
            {/* Sidebar - Desktop Only */}
            <aside className="hidden lg:flex flex-col w-80 bg-white border-r border-slate-200 p-6">
                <button
                    onClick={clearChat}
                    className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 mb-8 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 active:scale-95"
                >
                    <span className="material-symbols-outlined">add</span>
                    New Chat
                </button>

                <div className="flex-1 overflow-y-auto space-y-6">
                    <div>
                        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Recent</h3>
                        <div className="space-y-1">
                            {chatHistory.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleHistoryClick(item)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 text-slate-600 hover:text-primary transition-all text-left group ${sessionId === item.id ? 'bg-slate-50 border-l-4 border-primary' : ''}`}
                                >
                                    <span className="material-symbols-outlined text-slate-300 group-hover:text-primary transition-colors">history</span>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-xs font-bold truncate">{item.title}</span>
                                        <span className="text-[8px] text-slate-400">{new Date(item.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <button className="w-full flex items-center gap-3 p-3 rounded-xl text-slate-500 hover:bg-slate-50 transition-all text-left">
                        <span className="material-symbols-outlined text-slate-400">help</span>
                        <span className="text-xs font-bold">Help & Feedback</span>
                    </button>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative h-full">
                {/* Chat Header */}
                <header className="bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary">smart_toy</span>
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-slate-800">Sewa AI</h2>
                            <div className="flex items-center gap-1.5">
                                <div className="size-1.5 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[10px] font-bold text-slate-400">Your Nepali Assistant</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                            <span className="material-symbols-outlined text-xl">share</span>
                        </button>
                        <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all lg:hidden" onClick={clearChat}>
                            <span className="material-symbols-outlined text-xl">add</span>
                        </button>
                    </div>
                </header>

                {/* Messages */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 scroll-smooth pb-32"
                >
                    {messages.map((m, i) => (
                        <FadeIn key={i} delay={0} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                            <div className={`flex gap-3 max-w-[85%] md:max-w-[70%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                                <div className={`size-8 md:size-10 rounded-xl flex items-center justify-center flex-shrink-0 ${m.role === "user" ? "bg-primary text-white" : "bg-white border border-slate-200 text-primary"
                                    }`}>
                                    <span className="material-symbols-outlined text-lg md:text-xl">
                                        {m.role === "user" ? "person" : "smart_toy"}
                                    </span>
                                </div>
                                <div>
                                    <div className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${m.role === "user"
                                        ? "bg-primary text-white font-medium rounded-tr-none shadow-lg shadow-primary/20"
                                        : "bg-white border border-slate-100 text-slate-700 font-medium rounded-tl-none shadow-sm"
                                        }`}>
                                        {m.content}
                                    </div>
                                    <span className="text-[9px] font-bold text-slate-400 mt-1.5 block uppercase tracking-tighter">
                                        {m.role === "user" ? "You" : "Sewa AI"} • {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="flex gap-3">
                                <div className="size-8 md:size-10 rounded-xl bg-white border border-slate-200 text-primary flex items-center justify-center">
                                    <span className="material-symbols-outlined animate-bounce">smart_toy</span>
                                </div>
                                <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm flex gap-1 items-center">
                                    <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-1 h-1 bg-primary/40 rounded-full animate-bounce" />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input area */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent">
                    <div className="max-w-4xl mx-auto space-y-4">
                        {/* Quick Actions - Only show if conversation hasn't really started */}
                        {messages.length <= 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none animate-in fade-in slide-in-from-bottom-2">
                                {quickActions.map((action, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(action.label)}
                                        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-full text-[10px] font-black text-slate-600 hover:border-primary hover:text-primary transition-all whitespace-nowrap shadow-sm active:scale-95"
                                    >
                                        <span className="material-symbols-outlined text-sm">{action.icon}</span>
                                        {action.label}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Bar */}
                        <div className="relative flex items-center gap-2">
                            <div className="flex-1 relative group">
                                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors">attachment</span>
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                                    placeholder="Ask Sewa AI anything about Nepal..."
                                    className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-12 py-4 text-sm font-medium focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm"
                                />
                                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-primary transition-colors group">
                                    <span className="material-symbols-outlined">mic</span>
                                </button>
                            </div>
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim() || isLoading}
                                className="size-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:shadow-none active:scale-90"
                            >
                                <span className="material-symbols-outlined">send</span>
                            </button>
                        </div>

                        <p className="text-[9px] text-center font-bold text-slate-400 uppercase tracking-tighter">
                            Sewa AI can make mistakes. Check important info.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}
