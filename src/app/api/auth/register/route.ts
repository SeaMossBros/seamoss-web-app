import { NextRequest } from 'next/server'

import { setSessionCookie } from '@/lib/crypt'
import AuthService from '@/services/auth.service'

export const revalidate = 0 // No cache

export const POST = async (req: NextRequest) => {
  const { username, email, password } = await req.json()
  // console.log('creds in signin', { username, email, password });
  const authService = new AuthService()
  const registerRes = await authService.registerUser(username, email, password)
  // console.log('registerRes in route', registerRes)

  if (registerRes?.user.id) {
    await setSessionCookie(registerRes.user)
    // Redirect or return success response
    return new Response(JSON.stringify({ message: 'Registered successfully' }), { status: 200 })
  } else {
    // Handle login failure
    return new Response(
      JSON.stringify({ error: `Register failed. Register Res: ${JSON.stringify(registerRes)}` }),
      { status: 401 },
    )
  }
}
