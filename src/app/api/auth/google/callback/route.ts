import { notFound, redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { ROUTE_PATHS } from '@/consts/route-paths'
import AuthService from '@/services/auth.service'
import { setSessionCookie } from '@/lib/crypt'

export const revalidate = 0 // no cache

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = req.nextUrl
    const code = searchParams.get('code')
    
    console.log('searchParams in google callback', searchParams);
    console.log('code in google callback', code);
    if (!code) notFound();

    const authService = new AuthService()
    const accessTokenRes = await authService.exchangeCodeForAccessToken(code)
    console.log('accessTokenRes', accessTokenRes);
    if (!accessTokenRes) return new Response(JSON.stringify({ error: `Google login failed. accessTokenRes Res: ${JSON.stringify(accessTokenRes)}` }), { status: 401 }); 
    await setSessionCookie(accessTokenRes.data.user);
    const data = await authService.getUserInfo(accessTokenRes.data.jwt || '')
    if (!data) return new Response(JSON.stringify({ error: `Google login failed. exchangeCodeForAccessToken Res: ${JSON.stringify(accessTokenRes)}; getUserInfo Res: ${JSON.stringify(data)} ` }), { status: 401 });

    return redirect(ROUTE_PATHS.PROFILE.INDEX)
  } catch (err) {
    return new Response(JSON.stringify({ error: `Google login failed` }), { status: 401 });;
  }
}
