import { Media } from './Media'
import { ProductProperty } from './ProductProperty'
import { ProductVariant } from './ProductVariant'
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
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  description?: string
  images?: QueryResponse<Array<WithMetadata<Media>>>
  videos?: QueryResponse<Array<WithMetadata<Media>>>
  weight?: number
  units?: Units
  category?: Category
  certifications?: string
  healthBenefits?: string
  ingredients?: string
  countryOfOrigin?: string
  dimensions?: string
  sku?: string
  batchNumber?: string
  upc?: string
  expirationDate?: string
  tipsForStorage?: string
  slug: string
  product_variants?: QueryResponse<Array<WithMetadata<ProductVariant>>>
  thumbnail?: QueryResponse<WithMetadata<Media>>
  variant_selection_text?: string
  unit_property_selection_text?: string
  product_properties?: QueryResponse<Array<WithMetadata<ProductProperty>>>
}
