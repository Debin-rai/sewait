import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { setSession } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const { email, password, name } = await request.json();

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email already exists" },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || null,
                role: "USER",
                status: "ACTIVE",
                plan: "FREE",
                subscriptionStatus: "FREE",
                aiUnitsLimit: 3,
            },
        });

        // Log the event
        await prisma.auditLog.create({
            data: {
                action: 'REGISTER',
                details: `New user registered: ${email}`,
                status: 'SUCCESS'
            }
        });

        // Set session
        await setSession(user, false);

        return NextResponse.json({
            success: true,
            user: { email: user.email, name: user.name }
        });
    } catch (error) {
        console.error("Registration Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
