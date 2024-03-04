import { Metadata } from 'next'
import dynamic from 'next/dynamic'

const CartClientSide = dynamic(() => import('./CartClientSide'), { ssr: false })

export const metadata: Metadata = {
  title: 'Cart | SeaTheMoss',
}

export default function CartPage() {
  return (
    <div>
      <CartClientSide />
    </div>
  )
}
