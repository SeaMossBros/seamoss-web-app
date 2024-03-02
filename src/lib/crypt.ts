import { AuthUser } from '@/types/Auth';
import { cookies } from 'next/headers';
import CryptoJS from 'crypto-js';

const key = `${process.env.JWT_SECRET}` || 'secret';
const cookieStore = cookies;

// session 

export const encryptSession = async (payload: AuthUser) => {
    return CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
}

export const decryptSession = async (sessionValue: string): Promise<AuthUser> => {
    const bytes = CryptoJS.AES.decrypt(sessionValue, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const getSessionFromCookies = async (): Promise<AuthUser | null> => {
    const session = cookieStore().get('session');
    if (!session?.value) return null;
    return decryptSession(session.value);
}

export const setSessionCookie = async (user: AuthUser) => {
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

// all 

export const clearCookie = async (name: 'jwt' | 'tp' | 'session') => {
    if (!name) return;
    return cookieStore().delete(name);
}

// temp pass or jwt

export const encryptCookie = async (payload: string) => {
    return CryptoJS.AES.encrypt(JSON.stringify(payload), key).toString();
}

export const decryptCookie = async (payload: string): Promise<string> => {
    const bytes = CryptoJS.AES.decrypt(payload, key);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const getFromCookies = async (name: 'jwt' | 'tp'): Promise<string | null> => {
    if (!name) return null;
    const password = cookieStore().get(name);
    if (!password?.value) return null;
    return decryptCookie(password.value);
}

export const setCookie = async (cookie: string, name: 'jwt' | 'tp') => {
    if (!cookie || !name) return; 
    const expires = new Date(Date.now() + 60 * 60 * 24 * 1 * 1000); // expires in 1 day
    const encryptedCookie = await encryptCookie(cookie);

    cookieStore().set(name, encryptedCookie, {
        expires,
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV !== 'development',
        path: '/',
        maxAge: 60 * 60 * 24 * 1 // expires in 1 day
    });
}
