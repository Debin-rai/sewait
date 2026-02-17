import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE_NAME } from "@/lib/auth";

// Protected routes pattern
const SECRET_ADMIN_PATH = "/sewait-portal-99";
const PROTECTED_ROUTES = [SECRET_ADMIN_PATH];
const AUTH_ROUTES = [`${SECRET_ADMIN_PATH}/login`];

// Allowed IP Addresses (User should update this)
const ALLOWED_IPS = ["127.0.0.1", "::1"]; // Placeholder for local testing

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if the route is the secret admin path
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    // 2. Except for the login page (which is the auth page)
    const isAuthRoute = AUTH_ROUTES.some((route) =>
        pathname === route
    );

    const response = NextResponse.next();

    // --- Hardened Security Headers (Z+ Professional Grade) ---
    const headers = response.headers;

    // 1. Content Security Policy (Basic restrictive)
    headers.set('Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' fonts.gstatic.com; connect-src 'self';"
    );

    // 2. Strict Transport Security (HSTS) - Only applied in production
    if (process.env.NODE_ENV === 'production') {
        headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }

    // 3. Prevent Clickjacking
    headers.set('X-Frame-Options', 'DENY');

    // 4. Prevent MIME-type sniffing
    headers.set('X-Content-Type-Options', 'nosniff');

    // 5. Referrer Policy
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // 6. Permissions Policy
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

    if (isProtectedRoute && !isAuthRoute) {
        // --- IP Restriction Logic ---
        const clientIp = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
        if (process.env.NODE_ENV === 'production' && !ALLOWED_IPS.includes(clientIp)) {
            // In a real scenario, you'd be more careful with x-forwarded-for parsing
            // For now, we allow the request to proceed but this is the hook for lockdown
            console.warn(`Admin access attempt from unauthorized IP: ${clientIp}`);
        }

        const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

        if (!session) {
            const url = request.nextUrl.clone();
            url.pathname = `${SECRET_ADMIN_PATH}/login`;
            return NextResponse.redirect(url);
        }

        const payload = await decrypt(session);

        if (!payload || payload.user?.role !== "ADMIN") {
            const url = request.nextUrl.clone();
            url.pathname = `${SECRET_ADMIN_PATH}/login`;
            return NextResponse.redirect(url);
        }
    }

    if (isAuthRoute) {
        const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        if (session) {
            const payload = await decrypt(session);
            if (payload && payload.user?.role === "ADMIN") {
                const url = request.nextUrl.clone();
                url.pathname = SECRET_ADMIN_PATH;
                return NextResponse.redirect(url);
            }
        }
    }

    return response;
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - assets (public assets)
         */
        "/((?!api|_next/static|_next/image|favicon.ico|assets).*)",
    ],
};
