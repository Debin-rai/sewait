import prisma from "@/lib/prisma";

export async function checkAndIncrementAIUnits(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) return { allowed: false, error: "User not found" };

    const now = new Date();
    const lastReset = new Date(user.lastResetDate);
    
    // Check for daily reset
    const isSameDay = now.toDateString() === lastReset.toDateString();
    let currentDailyUsed = isSameDay ? user.dailyUnitsUsed : 0;
    
    // Define limits based on plan
    let dailyLimit = 3; // FREE: 3 units/day
    if (user.plan === "PRO") dailyLimit = 10; // PRO: 120/month (allowing ~10/day for flexibility)
    if (user.plan === "BUSINESS") dailyLimit = 50;

    if (currentDailyUsed >= dailyLimit) {
        return { 
            allowed: false, 
            error: `Daily AI Unit limit reached (${dailyLimit} units). Upgrade your plan for higher limits.`,
            limit: dailyLimit
        };
    }

    // Increment usage
    await prisma.user.update({
        where: { id: userId },
        data: {
            dailyUnitsUsed: currentDailyUsed + 1,
            aiUnitsUsedThisMonth: { increment: 1 },
            lastRequestAt: now,
            lastResetDate: now // Update to now to track latest activity
        }
    });

    return { allowed: true, remaining: dailyLimit - (currentDailyUsed + 1) };
}
