import * as admin from "firebase-admin";

if (!admin.apps.length) {
    try {
        const serviceAccountVar = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

        if (serviceAccountVar) {
            const serviceAccount = JSON.parse(serviceAccountVar);
            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
            });
        } else {
            // Fallback for local development if variable not set yet
            // This will allow the app to start even if the key is missing, 
            // but Firebase Admin features will fail until fixed.
            console.warn("FIREBASE_SERVICE_ACCOUNT_KEY is missing. Firebase Admin will not be initialized.");
        }
    } catch (error) {
        console.error("Firebase admin initialization error", error);
    }
}

export const adminAuth = admin.apps.length ? admin.auth() : null;
export const adminDb = admin.apps.length ? admin.firestore() : null;
