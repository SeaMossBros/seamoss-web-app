import { cookies } from 'next/headers'

import AuthService from '@/services/auth.service'

export const revalidate = 0 // no cache

export const GET = async () => {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access_token')

  if (!accessToken?.value) {
    return Response.json(null)
  }

  const authService = new AuthService()
  const user = await authService.getUserInfo(accessToken.value)

  return Response.json(user)
}

// export const SET = async (accessToken: string) => {
//   const cookieStore = cookies();
//   cookieStore.set('access_token', accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV !== 'development', // Secure in production
//     sameSite: 'strict',
//     path: '/',
//     maxAge: 60 * 60 * 24 * 3, // Example: 3 days (seconds * minutes * hours * days)
//   });

//   return GET();
// }
