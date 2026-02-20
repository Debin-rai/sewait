import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const { messages } = await request.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: 'Messages array required' }, { status: 400 });
        }

        // Get API key from database
        const config = await prisma.systemConfig.findUnique({
            where: { key: 'API_SEWA_AI' }
        });

        const apiKey = config?.value;
        if (!apiKey) {
            return NextResponse.json({ error: 'SewaAI API key not configured. Set it in Admin Settings.' }, { status: 500 });
        }

        const systemPrompt = `You are Sewa AI (सेवा AI), a friendly and knowledgeable Nepali assistant built into the SewaIT platform. You help users with:

- **Nepal Information**: Gold/silver rates, weather updates, Nepali calendar (Bikram Sambat), tithi, festivals
- **Government Services**: Passport applications, citizenship, driving license, PAN/VAT registration, land registration
- **General Knowledge**: Nepal geography, culture, history, current affairs
- **Daily Utilities**: Currency conversion, unit conversion, calculations

Guidelines:
- Be concise, helpful, and friendly
- Use both English and Nepali (नेपाली) where appropriate
- When providing rates or data, mention that users should verify with official sources
- Format responses with clear sections using bold text and bullet points
- If asked about something outside Nepal context, still help but gently remind you specialize in Nepal-related topics
- Always be respectful and professional`;

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

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            console.error('OpenRouter API Error:', errData);
            return NextResponse.json(
                { error: errData.error?.message || 'AI service unavailable' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

        return NextResponse.json({ reply });

    } catch (error) {
        console.error('SewaAI Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
