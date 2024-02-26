import { AuthUser } from "@/types/Auth";

export const getUser = async (): Promise<AuthUser | null> => {
    const res = await fetch('/api/auth/session', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-cache',
    });
    console.log('res in lib', res.json());
    const data = res.json();
    console.log('data in lib', data);
    if (!data || !data.user || !data.user.id) return null;
    return data.user;
}
