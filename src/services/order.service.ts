import axios from 'axios'
import qs from 'qs'

import { Cart } from '@/types/Cart'
import { CartItem } from '@/types/CartItem'
import { Order_NoRelations, PaymentStatus } from '@/types/Order'
import { QueryResponse } from '@/types/QueryResponse'

import CartService from './cart.service'
import CMSService from './core/cms.service'

type CartArrType = (Cart & {
  orderId: number[]
  orderTotal: number
  payment_status: PaymentStatus
  tracking_url_provider?: string
  label_url?: string
  customer_experience?: string
  user_email?: string
})[]

type CartItemArrType = CartItem[][]

interface OrderResult {
  carts: CartArrType
  cartItems: CartItemArrType
}

export default class OrderService extends CMSService {
  static queryKeys = {
    confirmPayment: (sessionId: string) => ['/payments/confirm', sessionId],
  }

  create = async (data: { cartId: number; email: string }) => {
    const url = `${this.baseURL}/orders`

    const payload = {
      data,
    }

    const res = await axios(url, {
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'post',
      data: JSON.stringify(payload),
    })

    return res.data as Promise<{
      data: Order_NoRelations
      paymentUrl: string
    }>
  }

  confirmPayment = async (sessionId: string) => {
    const url = `${this.baseURL}/payments/confirm${qs.stringify(
      {
        session_id: sessionId,
      },
      {
        addQueryPrefix: true,
      },
    )}`

    const res = await fetch(url, {
      headers: {
        ...this.headers,
        Accept: 'application/json',
      },
    })
    const data = await res.json()

    return data as Promise<{
      user?: any
      order?: Order_NoRelations
      status: 'open' | 'complete' | 'expired'
    }>
  }

  getOrders = async ({ email, mustHaveLabels }: { email?: string; mustHaveLabels?: boolean }) => {
    const url = `${this.baseURL}/orders`

    const filters: any = {}
    email && email.length > 0 ? (filters.user_email = email) : null
    mustHaveLabels ? (filters.label_url = { $ne: null }) : null

    const query = {
      filters,
      populate: {
        cart: {
          populate: {
            product: true,
            purchase_option: true,
            options: {
              populate: {
                product_variant: true,
                properties: {
                  populate: {
                    product_property: true,
                  },
                },
              },
            },
          },
        },
      },
    }

    const searchString = qs.stringify(query, {
      addQueryPrefix: true,
    })

    const res = await fetch(`${url}${searchString}`, {
      method: 'GET',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    })

    const { data } = await res.json()

    console.log('data', data)
    const fetchCarts = async (orders: any[]) => {
      const cartService = new CartService()
      const carts: any[] = []
      const cartItems: CartItem[][] = []

      for (let i = 0; i < orders.length; i++) {
        const curOrder = orders[i]
        const cartId = curOrder.attributes.cart.data.id
        const cartItemsRes: QueryResponse<CartItem[]> = await cartService.getCartItems(cartId, true) // get cart items
        const { data } = await cartService.getById(cartId, true) // get cart data (like created date)
        // TODO: NOT WORKING Get billing for each line item (this would also allow for the quantity purchased in each order) // Currently just getting total amount from order
        // const billingRes = await fetch(`/api/cart/${cartId}/billing`, { // get cart billing details
        //   method: 'GET',
        //   headers: {
        //     ...this.headers,
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   cache: 'no-store',
        // })
        // const billingData = await billingRes.json();
        // console.log('billing', billingData);
        const cart = {
          ...data,
          orderTotal: curOrder.attributes.total,
          payment_status: curOrder.attributes.payment_status,
          tracking_url_provider: curOrder.attributes.tracking_url_provider,
          label_url: curOrder.attributes.label_url,
          // shipping_address: curOrder.attributes.shipping_address,
          user_email: curOrder.attributes.user_email,
          customer_experience: curOrder.attributes.customer_experience,
          orderId: curOrder.id,
        }

        if (!cartItemsRes || !cartItemsRes.data || !cart) continue
        cartItems.push(cartItemsRes.data)
        carts.push(cart)
      }

      return { carts, cartItems }
    }

    const cartsData = await fetchCarts(data)

    return cartsData as OrderResult
  }
}
