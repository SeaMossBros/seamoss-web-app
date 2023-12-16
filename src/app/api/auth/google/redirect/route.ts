import { cookies } from 'next/headers'
import { notFound, redirect } from 'next/navigation'
import { NextRequest } from 'next/server'

import { ROUTE_PATHS } from '@/consts/route-paths'
import AuthService from '@/services/auth.service'

export const revalidate = 0 // no cache

export const GET = async (req: NextRequest) => {
  const { searchParams } = req.nextUrl
  const code = searchParams.get('code')

  if (!code) {
    notFound()
  }

  const cookieStore = cookies()
  const authService = new AuthService()
  const accessTokenRes = await authService.exchangeCodeForAccessToken(code)

  cookieStore.set('access_token', accessTokenRes.data.token, {
    httpOnly: true,
  })

  return redirect(ROUTE_PATHS.HOME)
}
