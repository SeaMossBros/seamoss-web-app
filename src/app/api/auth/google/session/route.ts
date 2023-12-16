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
  const user = await authService.getUserProfile(accessToken.value)

  return Response.json(user)
}
