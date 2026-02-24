import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebase-admin";
import prisma from "@/lib/prisma";
import { encrypt } from "@/lib/auth";
import { cookies } from "next/headers";

const SESSION_DURATION = 30 * 60 * 1000; // 30 minutes

export async function POST(req: NextRequest) {
    try {
        const { idToken } = await req.json();

        if (!idToken || !adminAuth) {
            return NextResponse.json(
                { error: "Invalid request or Firebase Admin not initialized" },
                { status: 400 }
            );
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

        // 2. Find or Create the User in Prisma
        let user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Create new user if they don't exist
            user = await prisma.user.create({
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
            if (!user.firebaseUid) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        firebaseUid: uid,
                        provider: user.provider === "CREDENTIALS" ? "GOOGLE" : user.provider
                    },
                });
            }
        }

        // 3. Create Session JWT (using the existing auth logic)
        // We reuse your custom JWT system so middleware stays the same
        const expires = new Date(Date.now() + SESSION_DURATION);
        const sessionToken = await encrypt({
            userId: user.id,
            email: user.email,
            role: user.role,
            expires,
        });

        // 4. Set Session Cookie
        const cookieStore = await cookies();
        cookieStore.set("admin_session", sessionToken, {
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
        console.error("Firebase API Auth Error:", error);
        return NextResponse.json(
            { error: "Authentication failed", details: error.message },
            { status: 500 }
        );
    }
}
