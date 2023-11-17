import { Product } from './Product'
import { ProductProperty } from './ProductProperty'
import { ProductVariant } from './ProductVariant'
import { PurchaseOption } from './PurchaseOption'
import { QueryResponse, WithMetadata } from './QueryResponse'

export interface CartItemProperties {
  product_property?: ProductProperty
  quantity: number
}

export interface CartItemVariant {
  product_variant?: ProductVariant
  quantity: number
  properties: CartItemProperties[]
}

export interface CartItem {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  product?: QueryResponse<WithMetadata<Product>>
  options?: CartItemVariant
  purchase_option?: QueryResponse<WithMetadata<PurchaseOption>>
}
