import { Media } from './Media'
import { ProductProperty, ProductProperty_Plain } from './ProductProperty'
import { ProductVariant, ProductVariant_Plain } from './ProductVariant'
import { PurchaseOption, PurchaseOption_Plain } from './PurchaseOption'

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
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    name: string
    description?: string
    images: { data: Media[] }
    videos?: { data: Media[] }
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
    product_variants: { data: ProductVariant[] }
    thumbnail?: { data: Media }
    variant_selection_text?: string
    unit_property_selection_text?: string
    product_properties: { data: ProductProperty[] }
    purchase_options?: { data: PurchaseOption[] }
  }
}
export interface Product_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  description?: string
  images: Media[]
  videos?: Media[]
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
  product_variants: ProductVariant_Plain[]
  thumbnail?: Media
  variant_selection_text?: string
  unit_property_selection_text?: string
  product_properties: ProductProperty_Plain[]
  purchase_options?: PurchaseOption_Plain[]
}

export interface Product_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  description?: string
  images: number[]
  videos?: number[]
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
  product_variants: number[]
  thumbnail?: number
  variant_selection_text?: string
  unit_property_selection_text?: string
  product_properties: number[]
  purchase_options?: number[]
}
