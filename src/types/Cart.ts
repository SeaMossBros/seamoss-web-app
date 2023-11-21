import { CartItem, CartItem_Plain } from './CartItem'

export interface Cart {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    cart_items: { data: CartItem[] }
  }
}
export interface Cart_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  cart_items: CartItem_Plain[]
}

export interface Cart_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  cart_items: number[]
}
