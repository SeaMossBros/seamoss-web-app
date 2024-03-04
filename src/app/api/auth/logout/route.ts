import { NextRequest } from 'next/server'

import { clearCookie } from '@/lib/crypt'

export const revalidate = 0 // No cache

export const POST = async (_: NextRequest) => {
  try {
    await clearCookie('session')
    await clearCookie('jwt')
    await clearCookie('tp')
    // Redirect or return success response
    return new Response(JSON.stringify({ message: 'Logout successful' }), { status: 200 })
    //  new Response(JSON.stringify({ data: loginRes?.user}), { status: 200 });
  } catch (err) {
    // Handle login failure
    return new Response(
      JSON.stringify({ error: `Logout failed. logout Res: ${JSON.stringify(err)}` }),
      { status: 500 },
    )
  }
}
