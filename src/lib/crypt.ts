import { LoginAuthUser } from '@/types/Auth';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

const key = `${process.env.JWT_SECRET}` || 'secret';
const cookieStore = cookies;

export const encryptSession = async (payload: LoginAuthUser) => {
    return CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
}

export const decryptSession = async (sessionValue: string): Promise<LoginAuthUser> => {
    const bytes = CryptoJS.AES.decrypt(sessionValue, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const getSessionFromCookies = async (): Promise<LoginAuthUser | null> => {
    const session = cookieStore().get('session');
    if (!session?.value) return null;
    return decryptSession(session.value);
}

export const setSeesionCookie = async (user: LoginAuthUser) => {
    const expires = new Date(Date.now() + 60 * 60 * 24 * 7 * 1000); // expires in 7 days
    const session = await encryptSession(user);
 
    cookieStore().set('session', session, {
        expires,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // expires in 7 days
    });
}

export const clearSessionCookie = async () => {
    return cookieStore().delete('session');
}
