import { Product } from './Product'
import { ProductProperty } from './ProductProperty'
import { ProductVariant } from './ProductVariant'
import { PurchaseOption } from './PurchaseOption'
import { WithMetadata } from './QueryResponse'

export type ProductSelectionFormData = {
  totalPrice: number | null
  discountedPrice: number | null
  product: WithMetadata<Product>
  variant: WithMetadata<ProductVariant> & {
    quantity: number
  }
  properties?: Array<
    WithMetadata<ProductProperty> & {
      quantity: number
    }
  >
  purchaseOption?: WithMetadata<PurchaseOption>
}
