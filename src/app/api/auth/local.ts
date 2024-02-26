import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import AuthService from '@/services/auth.service';
import { useProfile } from '@/queries/useProfile';

export const revalidate = 0; // No cache

export const POST = async (req: NextRequest) => {
    const { email, password } = await req.json();
    console.log('creds', { email, password });
    const authService = new AuthService();
    const loginRes = await authService.loginUser(email, password);
    // console.log('loginRes', loginRes);

    if (loginRes?.jwt) {
        const cookieStore = cookies();
        cookieStore.set('access_token', loginRes.jwt, { httpOnly: true, sameSite: 'strict' });
        useProfile().data = loginRes;
        // cookieStore.set('role', loginRes.user.role, { httpOnly: true, sameSite: 'strict' });
        // Redirect or return success response
        return redirect('/profile');
    } else {
        // Handle login failure
        return new Response(JSON.stringify({ error: 'Login failed' }), { status: 401 });
    }
};

