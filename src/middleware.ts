import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, SESSION_COOKIE_NAME } from "@/lib/auth";

// Protected routes pattern
const PROTECTED_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/admin/login"];

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if the route is /admin or /admin/*
    const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
        pathname.startsWith(route)
    );

    // 2. Except for /admin/login (which is the auth page)
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
        const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;

        if (!session) {
            const url = request.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }

        const payload = await decrypt(session);

        if (!payload || payload.user?.role !== "ADMIN") {
            const url = request.nextUrl.clone();
            url.pathname = "/admin/login";
            return NextResponse.redirect(url);
        }
    }

    if (isAuthRoute) {
        const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
        if (session) {
            const payload = await decrypt(session);
            if (payload && payload.user?.role === "ADMIN") {
                const url = request.nextUrl.clone();
                url.pathname = "/admin";
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
