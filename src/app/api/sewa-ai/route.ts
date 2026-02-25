import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getSession } from '@/lib/auth';
import { checkAndIncrementAIUnits } from '@/lib/aiUnits';

export async function POST(req: Request) {
    try {
        const { messages, sessionId, visitorHash } = await req.json();

        // 1. Session & Usage Gating
        const session = await getSession();
        if (session && session.user) {
            const usage = await checkAndIncrementAIUnits(session.user.id);
            if (!usage.allowed) {
                return NextResponse.json({ error: usage.error }, { status: 403 });
            }
        } else {
            // Anonymous usage limit (simple IP or hash based)
            // For MVP, we can just allow it or require login
            // Let's require login for the new atomic "AI Units" system to work properly
            return NextResponse.json({
                error: 'Authentication required',
                message: 'Please sign in to use Sewa AI. Free accounts get 3 units/day.'
            }, { status: 401 });
        }

        // Get API key from database
        const config = await prisma.systemConfig.findUnique({
            where: { key: 'API_SEWA_AI' }
        });

        const apiKey = config?.value;
        if (!apiKey) {
            return NextResponse.json({ error: 'SewaAI API key not configured. Set it in Admin Settings.' }, { status: 500 });
        }

        const systemPrompt = `You are SewaIT AI (सरकारी AI), a professional and premium Nepali assistant built into the SewaIT platform. 
Your primary goal is to help users with government service guides and generate accurate, formal, and high-quality Nepali government documents, letters, and applications.
Rules:
1. You were developed by Debin C. Rai (@Debin-rai).
2. You specialize in drafting: SewaIT Nibedan (applications), Character letters, Recommendation letters for Wards, and Job applications in formal Nepali format.
3. You can provide information about weather, Nepali calendar, and general government procedures.
4. IMPORTANT: Do NOT provide real-time gold or silver rates as they are no longer supported.
5. If asked about how you were made, credit Debin C. Rai and point to: https://github.com/Debin-rai.
6. When generating letters, use a very respectful and formal Nepali tone (Hami, Hajur, Binamra). Include placeholders like [नाम], [मिति], [वडा नं] where necessary.
7. Your target is a premium service (Rs. 400/month). Encourage users to use your document drafting capabilities.
8. Speak primarily in Nepali for document generation, but you can communicate in English for assistance. Always be helpful and professional.`;

        // Handle Session Persistence
        let activeSessionId = sessionId;

        if (!activeSessionId) {
            // Create a new session if none provided
            const newSession = await prisma.chatSession.create({
                data: {
                    visitorHash: visitorHash || 'anonymous',
                    title: messages[messages.length - 1]?.content?.substring(0, 50) || 'New Chat'
                }
            });
            activeSessionId = newSession.id;
        }

        // Save User Message to DB
        const lastUserMessage = messages[messages.length - 1];
        if (lastUserMessage && lastUserMessage.role === 'user') {
            await prisma.chatMessage.create({
                data: {
                    role: 'user',
                    content: lastUserMessage.content,
                    sessionId: activeSessionId
                }
            });
        }

        // Call OpenRouter API
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://sewait.com',
                'X-Title': 'SewaIT - Sewa AI'
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-001',
                messages: [
                    { role: 'system', content: systemPrompt },
                    ...messages
                ],
                max_tokens: 1024,
                temperature: 0.7
            })
        });

        const data = await response.json();
        const aiMessage = data.choices?.[0]?.message;

        if (aiMessage) {
            // Save AI Message to DB
            await prisma.chatMessage.create({
                data: {
                    role: 'assistant',
                    content: aiMessage.content,
                    sessionId: activeSessionId
                }
            });

            // Return response along with sessionId
            return NextResponse.json({
                message: aiMessage,
                sessionId: activeSessionId
            });
        }

        return NextResponse.json({ error: 'Failed to get response from AI' }, { status: 500 });

    } catch (error: any) {
        console.error('Sewa AI API Error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
