import { NextRequest } from 'next/server'

import { calculateCartBillingDetails } from '@/lib/billing'

export const revalidate = 0 // no cache

export const GET = async (_: NextRequest, route: any) => {
  const cartId = route.params.id
  if (!cartId) throw new Error('Cart ID not found in parameters')

  const { bill } = await calculateCartBillingDetails(cartId)

  return Response.json({
    data: bill,
  })
}
