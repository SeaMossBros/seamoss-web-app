import { Product, Product_Plain } from './Product'
import { ProductProperty, ProductProperty_Plain } from './ProductProperty'
import { ProductVariant, ProductVariant_Plain } from './ProductVariant'
import { PurchaseOption, PurchaseOption_Plain } from './PurchaseOption'

export interface CartItemProperties {
  product_property?: { data: ProductProperty }
  quantity: number
}
export interface CartItemProperties_Plain {
  product_property?: ProductProperty_Plain
  quantity: number
}

export interface CartItemProperties_NoRelations {
  product_property?: number
  quantity: number
}

export interface CartVariant {
  product_variant?: { data: ProductVariant }
  quantity: number
  properties: CartItemProperties[]
}
export interface CartVariant_Plain {
  product_variant?: ProductVariant_Plain
  quantity: number
  properties: CartItemProperties_Plain[]
}

export interface CartVariant_NoRelations {
  product_variant?: number
  quantity: number
  properties: CartItemProperties_NoRelations[]
}

export interface CartItem {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    product?: { data: Product }
    cart?: { data: import('./Cart').Cart }
    options?: CartVariant
    purchase_option?: { data: PurchaseOption }
  }
}
export interface CartItem_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  product?: Product_Plain
  cart?: import('./Cart').Cart_Plain
  options?: CartVariant_Plain
  purchase_option?: PurchaseOption_Plain
}

export interface CartItem_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  product?: number
  cart?: number
  options?: CartVariant_NoRelations
  purchase_option?: number
}
