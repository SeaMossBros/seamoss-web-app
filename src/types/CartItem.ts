import { Product } from './Product'
import { ProductProperty } from './ProductProperty'
import { ProductVariant } from './ProductVariant'
import { PurchaseOption } from './PurchaseOption'
import { QueryResponse, WithMetadata } from './QueryResponse'

export interface CartItemProperty {
  id: number
  product_property?: QueryResponse<WithMetadata<ProductProperty>>
  quantity: number
}

export interface CartItemOptions {
  product_variant?: QueryResponse<WithMetadata<ProductVariant>>
  quantity: number
  properties: Array<CartItemProperty>
}

export interface CartItem {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  product?: QueryResponse<WithMetadata<Product>>
  options?: CartItemOptions
  purchase_option?: QueryResponse<WithMetadata<PurchaseOption>>
}
