import { Media } from './Media'

export interface ProductVariant {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    name: string
    unit_price?: number
    product?: { data: import('./Product').Product }
    is_default?: boolean
    stock?: number
    units_per_stock?: number
    image?: { data: Media }
  }
}
export interface ProductVariant_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  unit_price?: number
  product?: import('./Product').Product_Plain
  is_default?: boolean
  stock?: number
  units_per_stock?: number
  image?: Media
}

export interface ProductVariant_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  unit_price?: number
  product?: number
  is_default?: boolean
  stock?: number
  units_per_stock?: number
  image?: number
}
