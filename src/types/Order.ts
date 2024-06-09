import { CartItem, CartItem_Plain } from './CartItem'

export enum PaymentStatus {
  pending = 'pending',
  success = 'success',
  cancelled = 'cancelled',
}

export interface Order {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    total: number
    payment_session_id?: string
    payment_status: PaymentStatus
    tracking_url_provider?: string
    label_url?: string
    label_is_printed?: boolean
    shipping_address?: string
    customer_experience?: string
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
  payment_session_id: string
  payment_status: PaymentStatus
  tracking_url_provider?: string
  label_url?: string
  label_is_printed?: boolean
  shipping_address?: string
  customer_experience?: string
  user_email?: string
  items: CartItem_Plain[]
}

export interface Order_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  total: number
  payment_session_id: string
  payment_status: PaymentStatus
  tracking_url_provider?: string
  label_url?: string
  label_is_printed?: boolean
  shipping_address?: string
  customer_experience?: string
  user_email?: string
  items: number[]
}
