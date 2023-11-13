'use server'

import { cookies } from 'next/headers'

export async function setCartId(id: number) {
  cookies().set('cartId', id.toString())
}
