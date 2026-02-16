import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const getSecretKey = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret && process.env.NODE_ENV === "production") {
        throw new Error("JWT_SECRET environment variable is required in production!");
    }
    return new TextEncoder().encode(secret || "sajilosathi-dev-insecure-key-only-for-local-testing");
};

const SECRET_KEY = getSecretKey();

export const SESSION_COOKIE_NAME = "admin_session";

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("24h")
        .sign(SECRET_KEY);
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, SECRET_KEY, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        return null;
    }
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(SESSION_COOKIE_NAME)?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (!session) return null;

    // Refresh the session so it doesn't expire if the user is active
    const parsed = await decrypt(session);
    if (!parsed) return null;

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const res = NextResponse.next();
    res.cookies.set({
        name: SESSION_COOKIE_NAME,
        value: await encrypt(parsed),
        httpOnly: true,
        expires: expires,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
    });
    return res;
}

export async function setSession(user: { id: string; email: string; role: string }) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({
        user: { id: user.id, email: user.email, role: user.role },
        expires
    });

    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, session, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        expires: expires,
    });
}

export async function clearSession() {
    const cookieStore = await cookies();
    cookieStore.set(SESSION_COOKIE_NAME, "", {
        expires: new Date(0),
        path: "/",
    });
}

/**
 * Verify if the current request is from an authenticated admin.
 * Used for protecting API routes (Z+ Secure).
 */
export async function verifyAdmin() {
    const session = await getSession();
    if (!session || session.user?.role !== "ADMIN") {
        return null;
    }
    return session;
}
