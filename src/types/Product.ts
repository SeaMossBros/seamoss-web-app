import { Media } from './Media'
import { ProductProperty, ProductProperty_Plain } from './ProductProperty'
import { ProductReview, ProductReview_Plain } from './ProductReview'
import { ProductVariant, ProductVariant_Plain } from './ProductVariant'
import { PurchaseOption, PurchaseOption_Plain } from './PurchaseOption'

export enum Category {
  // Gel = 'Gel',
  Dried = 'Dried',
  // Gummies = 'Gummies',
  // Clothing = 'Clothing',
  // Accessory = 'Accessory',
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
    category?: Category
    certifications?: string
    healthBenefits?: string
    ingredients?: string
    countryOfOrigin?: string
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
    product_reviews: { data: ProductReview[] }
    rating?: number
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
  category?: Category
  certifications?: string
  healthBenefits?: string
  ingredients?: string
  countryOfOrigin?: string
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
  product_reviews: ProductReview_Plain[]
  rating?: number
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
  category?: Category
  certifications?: string
  healthBenefits?: string
  ingredients?: string
  countryOfOrigin?: string
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
  product_reviews: number[]
  rating?: number
}

export interface Product_NoRelations_WithMinPrice extends Product_NoRelations {
  min_price?: number
}
