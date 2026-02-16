import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { setSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

// Basic in-memory rate limiting (Production should use Redis/Upstash)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "unknown";

    // Clean up old entries
    const now = Date.now();
    const attempt = loginAttempts.get(ip);

    if (attempt && now - attempt.lastAttempt > WINDOW_MS) {
        loginAttempts.delete(ip);
    }

    if (attempt && attempt.count >= MAX_ATTEMPTS) {
        return NextResponse.json(
            { error: "Too many login attempts. Please try again in 15 minutes." },
            { status: 429 }
        );
    }

    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Record failure
            const current = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
            loginAttempts.set(ip, { count: current.count + 1, lastAttempt: now });

            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            // Record failure
            const current = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
            loginAttempts.set(ip, { count: current.count + 1, lastAttempt: now });

            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        if (user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Access denied. Admin role required." },
                { status: 403 }
            );
        }

        // Success! Reset attempts
        loginAttempts.delete(ip);

        await setSession(user);

        return NextResponse.json({ success: true, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
