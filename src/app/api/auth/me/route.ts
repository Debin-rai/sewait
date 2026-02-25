import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getSession();

        if (!session || !session.user) {
            return NextResponse.json({ authenticated: false });
        }

        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                plan: true,
                subscriptionStatus: true,
                subscriptionExpiry: true,
                aiUnitsUsedThisMonth: true,
                aiUnitsLimit: true,
                dailyUnitsUsed: true,
                lastRequestAt: true,
                lastResetDate: true,
                provider: true,
                firebaseUid: true,
            }
        });

        if (!user) {
            return NextResponse.json({ authenticated: false });
        }

        return NextResponse.json({ authenticated: true, user });
    } catch (error) {
        console.error("Auth Me Error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
