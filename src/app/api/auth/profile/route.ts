import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { verifyCsrfToken } from "@/lib/csrf";

export async function POST(req: NextRequest) {
    try {
        // 1. Check Session
        const session = await getSession();
        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // 2. Verify CSRF
        const isValidCsrf = await verifyCsrfToken(req);
        if (!isValidCsrf) {
            return NextResponse.json({ error: "Invalid CSRF token" }, { status: 403 });
        }

        // 3. Parse Body
        const { name } = await req.json();
        if (!name || name.trim().length < 2) {
            return NextResponse.json({ error: "Name must be at least 2 characters" }, { status: 400 });
        }

        // 4. Update User
        const updatedUser = await prisma.user.update({
            where: { id: session.user.id },
            data: { name: name.trim() },
        });

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email
            }
        });
    } catch (error: any) {
        console.error("Profile Update Error:", error);
        return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
    }
}
