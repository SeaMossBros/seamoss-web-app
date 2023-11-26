import { CartItem, CartItem_Plain } from './CartItem'

export interface Order {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    total: number
    stripe_session_id: string
    user_email?: string
    items: { data: CartItem[] }
  }
}
export interface Order_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  total: number
  stripe_session_id: string
  user_email?: string
  items: CartItem_Plain[]
}

export interface Order_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  total: number
  stripe_session_id: string
  user_email?: string
  items: number[]
}
