import axios from 'axios'
import qs from 'qs'

import { CartItem } from '@/types/CartItem'
import { Order_NoRelations } from '@/types/Order'
import { QueryResponse } from '@/types/QueryResponse'

import CartService from './cart.service'
import CMSService from './core/cms.service'

export default class OrderService extends CMSService {
  static queryKeys = {
    confirmPayment: (sessionId: string) => ['/payments/confirm', sessionId],
  }

  create = async (data: { cartId: number }) => {
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

  getOrdersByEmail = async (email: string) => {
    const url = `${this.baseURL}/orders`

    const query = {
      filters: {
        user_email: email,
      },
      populate: {
        cart: true,
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

    const fetchCarts = async (orders: any[]) => {
      const cartService = new CartService()
      const carts: any[] = []
      const cartItems: CartItem[][] = []

      for (let i = 0; i < orders.length; i++) {
        const cartId = orders[i].attributes.cart.data.id
        const cartItemsRes: QueryResponse<CartItem[]> = await cartService.getCartItems(cartId, true) // get cart items
        const { data } = await cartService.getById(cartId, true) // get cart data (like created date)
        // TODO: Get billing for each line item // NOT WORKING
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
          orderTotal: orders[i].attributes.total,
          orderId: orders[i].id,
        }

        if (!cartItemsRes || !cartItemsRes.data || !cart) continue
        cartItems.push(cartItemsRes.data)
        carts.push(cart)
      }

      return { carts, cartItems }
    }

    const cartsData = await fetchCarts(data)

    return cartsData
  }
}
