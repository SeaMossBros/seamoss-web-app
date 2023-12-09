import { Media } from './Media'

export interface ProductReview {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    user_email: string
    rating: number
    comment?: string
    product?: { data: import('./Product').Product }
    attachments?: { data: Media[] }
    user_name: string
  }
}
export interface ProductReview_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  user_email: string
  rating: number
  comment?: string
  product?: import('./Product').Product_Plain
  attachments?: Media[]
  user_name: string
}

export interface ProductReview_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  user_email: string
  rating: number
  comment?: string
  product?: number
  attachments?: number[]
  user_name: string
}
