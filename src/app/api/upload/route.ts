import { NextResponse } from 'next/server';
import { verifyAdmin } from '@/lib/auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    const session = await verifyAdmin();
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Use ImgBB for permanent hosting (Railway ephemeral disk fix)
        // Sign up for a free key at https://api.imgbb.com/
        const IMGBB_API_KEY = process.env.IMGBB_API_KEY;

        if (!IMGBB_API_KEY) {
            return NextResponse.json({
                error: 'Server configuration error: IMGBB_API_KEY is not set in environment variables.'
            }, { status: 500 });
        }

        const imgbbFormData = new FormData();
        imgbbFormData.append('image', file);

        const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
            method: 'POST',
            body: imgbbFormData,
        });

        const result = await response.json();

        if (result.success) {
            return NextResponse.json({
                url: result.data.url,
                thumb: result.data.thumb?.url || result.data.url,
                delete_url: result.data.delete_url
            });
        } else {
            console.error("ImgBB API Error Details:", result);
            const errorMessage = result.error?.message || 'External upload failed';
            return NextResponse.json({
                error: `ImgBB Error: ${errorMessage}`,
                details: result.error
            }, { status: 502 });
        }
    } catch (error: any) {
        console.error("Upload proxy failure:", error);
        return NextResponse.json({ error: `Upload proxy failure: ${error.message}` }, { status: 500 });
    }
}
