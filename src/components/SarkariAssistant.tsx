"use client";

import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme, THEMES } from "@/context/ThemeContext";

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function SarkariAssistant() {
    const { t } = useLanguage();
    const { theme } = useTheme();
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "नमस्ते! म सरकारी एआई सहायक हुँ। म तपाईंलाई सरकारी कागजातहरू तयार गर्न वा कुनै पनि सेवाको बारेमा जानकारी दिन मद्दत गर्न सक्छु। म कसरी मद्दत गरौं?" }
    ]);
    const [sessionId, setSessionId] = useState<string | null>(null);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMsg = input.trim();
        const newMessages: Message[] = [...messages, { role: "user", content: userMsg }];

        setInput("");
        setMessages(newMessages);
        setLoading(true);

        try {
            const res = await fetch("/api/sewa-ai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: newMessages,
                    sessionId: sessionId,
                    visitorHash: "web-user" // Optional: fetch or generate a real hash
                }),
            });

            const data = await res.json();

            if (data.message) {
                setMessages(prev => [...prev, { role: "assistant", content: data.message.content }]);
                if (data.sessionId) setSessionId(data.sessionId);
            } else {
                setMessages(prev => [...prev, { role: "assistant", content: "म अहिले व्यस्त छु, कृपया पछि प्रयास गर्नुहोस्।" }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: "assistant", content: "माफ गर्नुहोस्, केही समस्या भयो।" }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-50 relative overflow-hidden">
            {/* Header */}
            <div className="p-4 text-white flex items-center justify-between" style={{ backgroundColor: THEMES[theme].primary }}>
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <span className="material-symbols-outlined text-sm">smart_toy</span>
                    </div>
                    <div>
                        <h3 className="text-sm font-bold leading-tight">Sarkari AI Assistant</h3>
                        <p className="text-[10px] text-white/70">Online | Powered by SewaIT</p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-4 custom-scrollbar"
            >
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'text-white rounded-tr-none' : 'bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none'}`}
                            style={msg.role === 'user' ? { backgroundColor: THEMES[theme].primary } : {}}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-sm outline-none transition-all focus:ring-2"
                        style={{ "--ring-color": `${THEMES[theme].primary}20` } as any}
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="w-10 h-10 text-white rounded-xl flex items-center justify-center hover:opacity-90 transition-colors disabled:opacity-50"
                        style={{ backgroundColor: THEMES[theme].primary }}
                    >
                        <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
