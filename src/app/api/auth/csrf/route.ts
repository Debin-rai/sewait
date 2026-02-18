import { generateCsrfToken } from "@/lib/csrf";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        await generateCsrfToken();
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("CSRF Generation Error:", error);
        return NextResponse.json({ error: "Failed to generate CSRF token" }, { status: 500 });
    }
}
