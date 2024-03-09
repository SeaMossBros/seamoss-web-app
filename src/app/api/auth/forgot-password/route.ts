import { NextRequest } from 'next/server'

import AuthService from '@/services/auth.service'

export const revalidate = 0 // No cache

export const POST = async (req: NextRequest) => {
  const { email } = await req.json()
  const authService = new AuthService()
  // console.log('email in route', email)
  if (email) {
    await authService.sendForgotPasswordLinkToEmail(email)

    // Redirect or return success response
    return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 })
  } else {
    // Handle login failure
    return new Response(JSON.stringify({ error: `Change password failed` }), { status: 500 })
  }
}
