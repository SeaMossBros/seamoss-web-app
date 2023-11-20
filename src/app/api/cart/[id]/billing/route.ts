import { NextRequest } from 'next/server'

import CartService from '@/services/cart.service'

export const revalidate = 0 // no cache

export const GET = async (_: NextRequest, route: any) => {
  const cartId = route.params.id
  if (!cartId) throw new Error('Cart ID not found in parameters')

  const cartService = new CartService()

  const cartItemsRes = await cartService.getCartItems(parseInt(cartId))

  const { data: cartItems = [] } = cartItemsRes

  const billingItems =
    cartItems?.reduce<
      Record<
        number,
        {
          totalPrice: number
          discountedPrice: number | null
        }
      >
    >((state, item) => {
      const variant = item.attributes.options?.product_variant?.data
      if (!variant || !variant.attributes.unit_price) return state
      const quantity = item.attributes.options?.quantity
      if (!quantity) return state

      const {
        attributes: { unit_price, units_per_stock = 1 },
      } = variant

      const totalPrice = unit_price * units_per_stock * quantity

      state[item.id] = {
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        discountedPrice: null,
      }

      const purchaseOption = item.attributes.purchase_option?.data
      if (!purchaseOption) return state

      const discountedPrice = (() => {
        if (!purchaseOption.attributes.has_discount) return null
        const { discount_unit, discount_value = 0 } = purchaseOption.attributes

        switch (discount_unit) {
          case 'fiat':
            return totalPrice - discount_value
          case 'percentage':
            const percentageLeft = 100 - discount_value
            return (totalPrice / 100) * percentageLeft
          default:
            return null
        }
      })()

      state[item.id].discountedPrice = discountedPrice
        ? parseFloat(discountedPrice.toFixed(2))
        : null

      return state
    }, {}) ?? {}

  const total = Object.values(billingItems).reduce<number>((sum, item) => {
    if (item.discountedPrice) {
      sum += item.discountedPrice
    } else {
      sum += item.totalPrice
    }

    return sum
  }, 0)

  return Response.json({
    data: {
      items: billingItems,
      total: parseFloat(total.toFixed(2)),
    },
  })
}
