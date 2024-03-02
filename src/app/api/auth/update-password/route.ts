import { NextRequest } from 'next/server';
import AuthService from '@/services/auth.service';
import { getFromCookies } from '@/lib/crypt';
// import { auth } from '@/lib/auth'

export const revalidate = 0; // No cache

export const POST = async (req: NextRequest) => {
    const { password, newPassword, confirmNewPassword } = await req.json();
    const authService = new AuthService();
    const jwt = await getFromCookies('jwt');
    console.log('jwt', jwt);

    if (jwt) {
        await authService.changePassword(password, newPassword, confirmNewPassword, jwt);

        // Redirect or return success response
        return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 });
    } else {
        // Handle login failure
        return new Response(JSON.stringify({ error: `Change password failed` }), { status: 500 });
    }
};
