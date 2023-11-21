import { Media } from './Media'

export interface ProductProperty {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    product?: { data: import('./Product').Product }
    name: string
    image?: { data: Media }
  }
}
export interface ProductProperty_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  product?: import('./Product').Product_Plain
  name: string
  image?: Media
}

export interface ProductProperty_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  product?: number
  name: string
  image?: number
}
