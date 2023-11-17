import qs from 'qs'

import { Cart } from '@/types/Cart'
import { CartItem } from '@/types/CartItem'
import { QueryResponse, WithMetadata } from '@/types/QueryResponse'

import CMSService from './core/cms.service'

export type AddToCartData = {
  cartId: number
  productId: number
  variant: {
    variantId: number
    quantity: number
  }
  properties?: Array<{
    propertyId: number
    quantity: number
  }>
  purchaseOptionId: number
}
export default class CartService extends CMSService {
  static queryKeys = {
    getById: (cartId: number) => ['/carts', cartId],
  }

  getById = async (cartId: number) => {
    const url = `${this.baseURL}/carts/${cartId}`
    const search = qs.stringify({
      populate: ['cart_items'],
    })

    const res = await fetch(`${url}?${search}`, {
      headers: this.headers,
    })

    return (await res.json()) as QueryResponse<WithMetadata<Cart>>
  }

  createCart = async () => {
    const url = `${this.baseURL}/carts`

    const res = await fetch(url, {
      method: 'post',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {},
      }),
    })
    return (await res.json()) as QueryResponse<WithMetadata<Cart>>
  }

  createCartItem = async (data: AddToCartData) => {
    const payload = {
      data: {
        cart: data.cartId,
        product: data.productId,
        options: {
          product_variant: data.variant.variantId,
          quantity: data.variant.quantity,
          properties: data.properties?.map((property) => ({
            product_property: property.propertyId,
            quantity: property.quantity,
          })),
        },
        purchase_option: data.purchaseOptionId,
      },
    }
    const url = `${this.baseURL}/cart-items`
    const body = JSON.stringify(payload)
    const res = await fetch(url, {
      method: 'post',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })
    return (await res.json()) as QueryResponse<WithMetadata<CartItem>>
  }

  updateQuantity = async (cartItemId: number, quantity: number) => {
    const url = `${this.baseURL}/cart-items/${cartItemId}`

    const body = JSON.stringify({
      data: {
        quantity,
      },
    })

    const res = await fetch(url, {
      method: 'put',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })

    return (await res.json()) as QueryResponse<WithMetadata<CartItem>>
  }

  addToCart = async (data: AddToCartData) => {
    // const checkExistsUrl = `${this.baseURL}/cart-items`
    // const query = {
    //   filters: {
    //     product: {
    //       id: {
    //         $eq: data.productId,
    //       },
    //     },
    //     options: {
    //       product_variant: data.variant.variantId
    //     },
    //     cart: {
    //       id: {
    //         $eq: data.cartId,
    //       },
    //     },
    //   },
    // }
    // const checkExistsSearch = qs.stringify(query)

    // const existances = (await fetch(`${checkExistsUrl}?${checkExistsSearch}`, {
    //   headers: this.headers,
    // }).then((res) => res.json())) as QueryResponse<Array<WithMetadata<CartItem>>>
    // const existingCartItem = existances.data?.[0]

    return this.createCartItem(data)

    // return this.updateQuantity(existingCartItem.id, existingCartItem.attributes.quantity + quantity)
  }
}
