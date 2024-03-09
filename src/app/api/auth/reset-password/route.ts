import { NextRequest } from 'next/server'

import AuthService from '@/services/auth.service'

export const revalidate = 0 // No cache

export const POST = async (req: NextRequest) => {
  const { code, newPassword, confirmNewPassword } = await req.json()
  const authService = new AuthService()

  if (code && newPassword && confirmNewPassword) {
    await authService.resetPassword(code, newPassword, confirmNewPassword)

    // Redirect or return success response
    return new Response(JSON.stringify({ message: 'Login successful' }), { status: 200 })
  } else {
    // Handle login failure
    return new Response(JSON.stringify({ error: `Change password failed` }), { status: 500 })
  }
}
