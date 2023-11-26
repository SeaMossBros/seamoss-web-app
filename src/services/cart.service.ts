import { differenceBy } from 'lodash'
import intersectionBy from 'lodash/intersectionBy'
import qs from 'qs'

import { Cart } from '@/types/Cart'
import { CartItem } from '@/types/CartItem'
import { QueryResponse } from '@/types/QueryResponse'

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
    getCartItems: (cartId: number) => ['/cart-items', cartId],
  }

  getById = async (cartId: number) => {
    const url = `${this.baseURL}/carts/${cartId}`
    const search = qs.stringify({
      populate: ['cart_items'],
      filters: {
        is_checked_out: false,
      },
    })

    const res = await fetch(`${url}?${search}`, {
      headers: this.headers,
    })

    return (await res.json()) as QueryResponse<Cart>
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
    return (await res.json()) as QueryResponse<Cart>
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
    return (await res.json()) as QueryResponse<CartItem>
  }

  updateCartItem = async (cartItem: CartItem, newItem: AddToCartData) => {
    const url = `${this.baseURL}/cart-items/${cartItem.id}`

    let properties = cartItem.attributes.options?.properties

    if (newItem.properties?.length) {
      const propertiesToAddQuantity = intersectionBy(
        newItem.properties.map((p) => ({
          id: p.propertyId,
          quantity: p.quantity,
        })),
        properties?.map((p) => ({
          id: p.product_property?.data?.id,
          quantity: p.quantity,
        })) ?? [],
        'id',
      )

      if (propertiesToAddQuantity.length) {
        propertiesToAddQuantity.forEach((property) => {
          const existingProperty = properties?.find(
            (p) => p.product_property?.data && p.product_property?.data.id === property.id,
          )

          if (existingProperty) existingProperty.quantity += property.quantity
        })
      }
      const propertiesToAdd = differenceBy(
        newItem.properties.map((p) => ({
          id: p.propertyId,
          quantity: p.quantity,
        })),
        properties?.map((p) => ({
          id: p.product_property?.data?.id,
          quantity: p.quantity,
        })) ?? [],
        'id',
      )

      if (propertiesToAdd.length) {
        properties = properties ?? []
        properties.push(...propertiesToAdd)
      }
    }

    const payload = {
      data: {
        options: {
          product_variant: cartItem.attributes.options?.product_variant?.data?.id,
          quantity: cartItem.attributes.options!.quantity + newItem.variant.quantity,
          properties: properties?.map((p: any) => ({
            product_property: p.product_property?.data?.id ?? p.id,
            quantity: p.quantity,
          })),
        },
      },
    }

    const body = JSON.stringify(payload)

    const res = await fetch(url, {
      method: 'put',
      headers: {
        ...this.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    })

    return (await res.json()) as QueryResponse<CartItem>
  }

  addToCart = async (data: AddToCartData) => {
    const checkExistsUrl = `${this.baseURL}/cart-items`
    const query = {
      filters: {
        product: {
          id: {
            $eq: data.productId,
          },
        },
        purchase_option: {
          id: data.purchaseOptionId,
        },
        options: {
          product_variant: data.variant.variantId,
        },
        cart: {
          id: {
            $eq: data.cartId,
          },
        },
      },
      populate: {
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
    }
    const checkExistsSearch = qs.stringify(query)

    const existances = (await fetch(`${checkExistsUrl}?${checkExistsSearch}`, {
      headers: this.headers,
    }).then((res) => res.json())) as QueryResponse<Array<CartItem>>
    const existingCartItem = existances.data?.[0]

    if (!existingCartItem) return this.createCartItem(data)

    return this.updateCartItem(existingCartItem, data)
  }

  getCartItems = async (cartId: number) => {
    const url = `${this.baseURL}/cart-items`

    const query = {
      filters: {
        cart: {
          id: cartId,
          is_checked_out: false,
        },
      },
      populate: {
        product: {
          populate: ['thumbnail'],
        },
        purchase_option: true,
        options: {
          populate: {
            product_variant: {
              populate: ['image'],
            },
            properties: {
              populate: {
                product_property: true,
              },
            },
          },
        },
      },
      pagination: {
        start: 0,
        limit: 1000,
      },
    }

    const searchString = qs.stringify(query, {
      addQueryPrefix: true,
    })

    const res = await fetch(`${url}${searchString}`, {
      headers: this.headers,
    })

    return res.json() as Promise<QueryResponse<Array<CartItem>>>
  }

  removeItem = async (cartItemId: number) => {
    const url = `${this.baseURL}/cart-items/${cartItemId}`

    await fetch(url, {
      headers: this.headers,
      method: 'delete',
    })
  }
}
