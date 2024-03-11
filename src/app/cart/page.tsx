import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

const CartClientSide = dynamic(() => import('./CartClientSide'), { ssr: false })

export const metadata: Metadata = {
  title: 'Cart | SeaTheMoss',
}

export default async function CartPage() {
  const user: AuthUser | null = await getSessionFromCookies()

  return (
    <div>
      <CartClientSide email={user?.email || ''} />
    </div>
  )
}
