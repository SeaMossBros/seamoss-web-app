import { NextRequest } from 'next/server';
import AuthService from '@/services/auth.service';
import { setCookie, setSessionCookie } from '@/lib/crypt';
// import { auth } from '@/lib/auth'

export const revalidate = 0; // No cache

export const POST = async (req: NextRequest) => {
    const { email, password, isTempPass } = await req.json();
    const authService = new AuthService();
    const loginRes = await authService.loginUser(email, password);

    if (loginRes?.user?.id) {
        // Test123456!!
        await setSessionCookie(loginRes.user);
        isTempPass && await setCookie(password, 'tp');
        loginRes.jwt && await setCookie(loginRes.jwt, 'jwt');
        // Redirect or return success response
        return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    } else {
        // Handle login failure
        return new Response(JSON.stringify({ error: `Login failed. Login Res: ${JSON.stringify(loginRes)}` }), { status: 401 });
    }
};
