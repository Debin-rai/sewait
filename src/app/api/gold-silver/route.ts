import { NextResponse } from "next/server";

// Placeholder route for the removed gold‑silver feature.
export async function GET() {
    return NextResponse.json({ error: "Gold‑Silver feature has been removed" }, { status: 410 });
}
