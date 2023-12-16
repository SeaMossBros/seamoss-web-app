'use server'

import { cookies } from 'next/headers'

export async function logout() {
  const sessionStore = cookies()

  sessionStore.delete('access_token')
}
