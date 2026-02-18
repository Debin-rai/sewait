import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { setSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

// Basic in-memory rate limiting (Production should use Redis/Upstash)
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 6;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes
const ADMIN_IP = "27.34.111.188"; // User specified IP

export async function POST(request: Request) {
    const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "unknown";

    if (ip !== ADMIN_IP && ip !== "127.0.0.1" && process.env.NODE_ENV === "production") {
        return NextResponse.json(
            { error: "Access Denied: IP not authorized." },
            { status: 403 }
        );
    }

    // Clean up old entries
    const now = Date.now();
    const attempt = loginAttempts.get(ip);

    if (attempt && now - attempt.lastAttempt > WINDOW_MS) {
        loginAttempts.delete(ip);
    }

    if (attempt && attempt.count >= MAX_ATTEMPTS) {
        return NextResponse.json(
            { error: "Too many login attempts. Please try again in 5 minutes." },
            { status: 429 }
        );
    }

    try {
        const { email, password, rememberMe } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Verify CSRF
        const { verifyCsrfToken } = await import("@/lib/csrf");
        const isValidCsrf = await verifyCsrfToken(request);
        if (!isValidCsrf) {
            return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        // Check for lockout
        if (user && user.lockoutUntil && user.lockoutUntil > new Date()) {
            const minutesLeft = Math.ceil((user.lockoutUntil.getTime() - Date.now()) / 60000);
            return NextResponse.json(
                { error: `Account locked due to too many failed attempts. Try again in ${minutesLeft} minutes.` },
                { status: 429 }
            );
        }

        if (!user) {
            // Log failed attempts for non-existent users for security audit
            await prisma.auditLog.create({
                data: {
                    action: 'AUTH_FAILURE',
                    details: `Login attempt for non-existent user: ${email}`,
                    ipAddress: ip,
                    status: 'FAILED'
                }
            });

            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            const newFailedAttempts = user.failedAttempts + 1;
            let lockoutUntil = null;

            if (newFailedAttempts >= 6) {
                lockoutUntil = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
            }

            await prisma.user.update({
                where: { id: user.id },
                data: {
                    failedAttempts: newFailedAttempts,
                    lockoutUntil: lockoutUntil
                }
            });

            await prisma.auditLog.create({
                data: {
                    action: 'AUTH_FAILURE',
                    details: `Failed password for user: ${email}`,
                    ipAddress: ip,
                    status: 'FAILED',
                    adminId: user.id
                }
            });

            return NextResponse.json(
                { error: "Invalid credentials" },
                { status: 401 }
            );
        }

        if (user.role !== "ADMIN" && user.role !== "SUPER_ADMIN") {
            return NextResponse.json(
                { error: "Access denied. Admin role required." },
                { status: 403 }
            );
        }

        // Success! Reset attempts
        await prisma.user.update({
            where: { id: user.id },
            data: {
                failedAttempts: 0,
                lockoutUntil: null,
                lastLogin: new Date()
            }
        });

        // --- Audit Log ---
        await prisma.auditLog.create({
            data: {
                action: 'LOGIN',
                adminId: user.id,
                details: 'Admin logged in successfully',
                ipAddress: ip,
                status: 'SUCCESS'
            }
        });

        await setSession(user, rememberMe);

        return NextResponse.json({ success: true, user: { email: user.email, name: user.name } });
    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
