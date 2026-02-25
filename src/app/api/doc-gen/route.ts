import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { checkAndIncrementAIUnits } from "@/lib/aiUnits";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function POST(request: Request) {
    if (!OPENROUTER_API_KEY) {
        return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    try {
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({
                error: "Authentication required",
                message: "Please login to generate official documents."
            }, { status: 401 });
        }

        const { type, details } = await request.json();

        // 1. Usage Gating
        const usage = await checkAndIncrementAIUnits(session.user.id);
        if (!usage.allowed) {
            return NextResponse.json({
                error: "Limit reached",
                message: usage.error
            }, { status: 403 });
        }

        const systemPrompt = `
            You are "SewaIT AI", a professional Nepali Government Document Specialist.
            Your goal is to generate HIGHLY FORMAL and ACCURATE Nepali documents (letters, applications/nibedan, certificates) based on user details.
            
            RULES:
            1. Tone: Use extremely respectful and official Nepali (Vinaamra tone). Use "Hajur", "Sampanna", "Anurodh", etc.
            2. Language: Strictly in Nepali.
            3. Format: Include standard placeholders if details are missing (e.g., [मिति], [ठेगाना]).
            4. Structure:
               - Top Right: Date (Miti)
               - Top Left: To (Shree...), Office Name, Address.
               - Center: Subject (Bishaya: ...)
               - Body: Purpose of the document, formally stated.
               - Bottom: Closing (Bhavadiya / Nibedak), Name placeholder.
            5. Output: Return ONLY the document text in a clean format using Markdown. Do not add conversational filler.
        `;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                "HTTP-Referer": "https://sewait.up.railway.app",
                "X-Title": "SewaIT AI Document Gen",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: "google/gemini-2.0-flash-001",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Generate a formal ${type} based on: ${details}` }
                ],
            }),
        });

        const data = await response.json();
        const content = data.choices[0].message.content;

        // --- Save the Document ---
        await prisma.savedDocument.create({
            data: {
                type,
                details,
                content,
                userId: session.user.id
            }
        });

        return NextResponse.json({ content });
    } catch (error) {
        console.error("DocGen Error:", error);
        return NextResponse.json({ error: "Generation failed" }, { status: 500 });
    }
}

