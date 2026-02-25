import prisma from "@/lib/prisma";

export async function checkAndIncrementAIUnits(userId: string) {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) return { allowed: false, error: "User not found" };

    const now = new Date();
    const lastReset = new Date(user.lastResetDate);

    // Define limits based on plan
    let dailyLimit = 3; // Units per cycle
    let cycleDays = 1; // Default to daily

    if (user.plan === "FREE") {
        cycleDays = 7;
        dailyLimit = 3; // 3 units every 7 days
    } else if (user.plan === "PRO") {
        dailyLimit = 10; // ~10/day
    } else if (user.plan === "BUSINESS") {
        dailyLimit = 50;
    }

    const diffTime = now.getTime() - lastReset.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    const isNewCycle = diffDays >= cycleDays;

    let currentUsage = isNewCycle ? 0 : user.dailyUnitsUsed;

    if (currentUsage >= dailyLimit) {
        const unlockDate = new Date(lastReset.getTime() + (cycleDays * 24 * 60 * 60 * 1000));
        return {
            allowed: false,
            error: user.plan === "FREE"
                ? `Free plan units finished. Chatbot will unlock in ${Math.ceil(cycleDays - diffDays)} days.`
                : `Daily AI Unit limit reached (${dailyLimit} units). Upgrade your plan for higher limits.`,
            limit: dailyLimit,
            unlockDate: unlockDate.toISOString(),
            plan: user.plan
        };
    }

    // Increment usage
    await prisma.user.update({
        where: { id: userId },
        data: {
            dailyUnitsUsed: currentUsage + 1,
            aiUnitsUsedThisMonth: { increment: 1 },
            lastRequestAt: now,
            lastResetDate: isNewCycle ? now : undefined // Only reset the anchor if it's a new cycle
        }
    });

    return { allowed: true, remaining: dailyLimit - (currentUsage + 1) };
}
