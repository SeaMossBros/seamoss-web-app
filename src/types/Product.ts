import { Media } from './Media'
import { QueryResponse, WithMetadata } from './QueryResponse'

export enum Units {
  Oz = 'oz',
  FlOz = 'Fl oz',
}
export enum Category {
  Gel = 'Gel',
  Dry = 'Dry',
  Clothing = 'Clothing',
  Accessory = 'Accessory',
}

export interface Product {
  id: number
  slug: string
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  name: string
  about?: string
  price?: number
  createdAtDate?: Date
  stock?: number
  images?: QueryResponse<Media>
  videos?: QueryResponse<Media>
  weight?: number
  units?: Units
  quantity?: number
  category?: Category
  certifications?: string
  healthBenefits?: string
  ingredients?: string
  countryOfOrigin?: string
  dimensions?: string
  sku?: string
  batchNumber?: string
  upc?: string
  expirationDate?: Date
  tipsForStorage?: string
}
