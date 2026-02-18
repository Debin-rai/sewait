import { cookies } from "next/headers";
import crypto from "crypto";

/**
 * CSRF Protection Utility for SewaIT
 * Implements Double-Submit Cookie pattern
 */

const CSRF_COOKIE_NAME = "sewait_csrf_token";
const CSRF_HEADER_NAME = "x-csrf-token";

export async function generateCsrfToken() {
    const token = crypto.randomBytes(32).toString('hex');
    const cookieStore = await cookies();
    cookieStore.set(CSRF_COOKIE_NAME, token, {
        httpOnly: false, // Must be accessible by client to send back in header
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    return token;
}

export async function verifyCsrfToken(request: Request) {
    const cookieStore = await cookies();
    const cookieToken = cookieStore.get(CSRF_COOKIE_NAME)?.value;
    const headerToken = request.headers.get(CSRF_HEADER_NAME);

    if (!cookieToken || !headerToken || cookieToken !== headerToken) {
        return false;
    }
    return true;
}
