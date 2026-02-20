import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET all settings or group-specific settings
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const group = searchParams.get('group');

        const settings = await prisma.siteSetting.findMany({
            where: group ? { group } : undefined,
        });

        // Convert array of objects to key-value pairs for easier frontend mapping
        const settingsMap = settings.reduce((acc, curr) => {
            acc[curr.key] = curr.value;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json(settingsMap);
    } catch (error) {
        console.error('Error fetching settings:', error);
        return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
    }
}

// POST to update settings in bulk
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { settings, group } = body;

        if (!settings || typeof settings !== 'object') {
            return NextResponse.json({ error: 'Invalid settings format. Expected object.' }, { status: 400 });
        }

        const txps = Object.entries(settings).map(([key, value]) => {
            return prisma.siteSetting.upsert({
                where: { key },
                update: { value: String(value), group: group || "GENERAL" },
                create: { key, value: String(value), group: group || "GENERAL" },
            });
        });

        await prisma.$transaction(txps);

        return NextResponse.json({ message: 'Settings updated successfully' });
    } catch (error) {
        console.error('Error updating settings:', error);
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
    }
}
