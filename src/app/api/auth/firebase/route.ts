import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();

        if (!adminAuth) {
            console.error("❌ Firebase Admin NOT initialized. Check FIREBASE_SERVICE_ACCOUNT_KEY.");
            return NextResponse.json(
                { error: "Server Configuration Error", details: "Firebase Admin is not initialized on the server." },
                { status: 500 }
            );
        }

        if (!idToken) {
            return NextResponse.json({ error: "Missing ID Token" }, { status: 400 });
        }

        // Verify CSRF
        const { verifyCsrfToken } = await import("@/lib/csrf");
        const isValidCsrf = await verifyCsrfToken(req);
        if (!isValidCsrf) {
            return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
        }

        // 1. Verify the Firebase ID token
        const decodedToken = await adminAuth.verifyIdToken(idToken);
        const { email, uid, name, picture } = decodedToken;

        if (!email) {
            return NextResponse.json(
                { error: "Email missing from Firebase token" },
                { status: 400 }
            );
        }

        // --- Limited Users Check (Whitelist) ---
        const allowedEmails = process.env.ALLOWED_EMAILS?.split(",").map(e => e.trim()) || [];
        if (allowedEmails.length > 0 && !allowedEmails.includes(email)) {
            console.warn(`🚫 BLOCKED sign-in attempt from unauthorized email: ${email}`);
            return NextResponse.json(
                { error: "Access Denied: Your email is not authorized to use this application." },
                { status: 403 }
            );
        }

        // 2. Find or Create the User in Prisma
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Create new user if they don't exist
            user = await (prisma.user.create as any)({
                data: {
                    email,
                    name: name || null,
                    firebaseUid: uid,
                    provider: decodedToken.firebase?.sign_in_provider?.toUpperCase() || "GOOGLE",
                    role: "USER",
                    status: "ACTIVE",
                    plan: "FREE",
                    subscriptionStatus: "FREE",
                },
            });
        } else {
            // Update existing user with Firebase UID if it's missing (link account)
            if (!(user as any).firebaseUid) {
                user = await (prisma.user.update as any)({
                    where: { id: user.id },
                    data: {
                        firebaseUid: uid,
                        provider: (user as any).provider === "CREDENTIALS" ? "GOOGLE" : (user as any).provider
                    },
                });
            }
        }

        if (!user) {
            return NextResponse.json(
                { error: "User could not be created or found" },
                { status: 500 }
            );
        }

        // 3. Create Session JWT (using the existing auth logic)
        // We reuse your custom JWT system so proxy stays the same
        const expires = new Date(Date.now() + SESSION_DURATION);
        const sessionToken = await encrypt({
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
            expires,
        });

        // 4. Set Session Cookie
        const { SESSION_COOKIE_NAME } = await import("@/lib/auth");
        const cookieStore = await cookies();
        cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
            expires,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        });

        return NextResponse.json({
            success: true,
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
            },
        });
    } catch (error: any) {
        console.error("❌ Firebase API Auth Error:", error);
        return NextResponse.json(
            {
                error: "Authentication failed",
                details: error.message,
                code: error.code || "unknown_error",
                stack: process.env.NODE_ENV === "development" ? error.stack : undefined
            },
            { status: 500 }
        );
    }
}
