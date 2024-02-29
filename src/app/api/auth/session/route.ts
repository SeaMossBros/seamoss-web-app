import { NextRequest } from 'next/server';
import { getSessionFromCookies } from '@/lib/crypt';
import { AuthUser } from '@/types/Auth';

export const revalidate = 0; // No cache

export const GET = async (req: NextRequest) => {
    const data: AuthUser | null = await getSessionFromCookies();
    console.log('data in session get', data);
    if (data && data.id) {
        // Redirect or return success response
        return new Response(JSON.stringify({ message: 'Login successful', data: data }), { status: 200 });
    } else {
        // Handle login failure
        return new Response(JSON.stringify({ error: `Login failed. Login Res: ${JSON.stringify(data)}` }), { status: 401 });
    }
};
