import qs from 'qs'
import axios from 'axios'
import CMSService from './core/cms.service'
import CartService from './cart.service'
import { QueryResponse } from '@/types/QueryResponse'
import { CartItem } from '@/types/CartItem'
import { Order_NoRelations } from '@/types/Order'
import { Cart } from '@/types/Cart'

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

    return res.json() as Promise<{
      order?: Order_NoRelations
      status: 'open' | 'complete' | 'expired'
    }>
  }

  getOrdersByEmail = async (email: string) => {
    const url = `${this.baseURL}/orders`;

    const query = {
      filters: {
        user_email: email,
      },
      populate: {
        cart: true
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

    const data = await res.json();

    const fetchCarts = async (orders: any[]) => {
      const cartService = new CartService();
      const carts: Cart[] = [];
      const cartItems: CartItem[][] = [];

      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const cartId = order.attributes.cart.data.id;
        const cartItemsRes: QueryResponse<CartItem[]> = await cartService.getCartItems(cartId, true);
        const cart = await cartService.getById(cartId, true);
        if (!cartItemsRes || !cartItemsRes.data || !cart || !cart.data) continue;
        // console.log('cartItems', cartItems.data);
        cartItems.push(cartItemsRes.data);
        carts.push(cart.data);

        // const cartItems = cart.data.attributes.cart_items.data;
        // for (let j = 0; j < cartItems.length; j++) {
        //   const cartItemId = cartItems[j].id;
        //   if (!cartItemIds.includes(cartItemId)) {
        //     cartItemIds.push(cartItemId);
        //   }
        // }
      }

      // for (let i = 0; i < cartItemIds.length; i++) {
      //   const cartItem: CartItem = await cartService.getCartItems(cartItemIds[i])
      // }
      return { carts, cartItems };
    }

    const cartsData = await fetchCarts(data.data);

    // console.log('carts in getOrdersByEmail', carts);

    // console.log('res from getOrdersByEmail', data);

    return cartsData as { cartItems: CartItem[][], carts: Cart[] }
  }
}
