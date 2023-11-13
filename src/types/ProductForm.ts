import { ProductProperty } from './ProductProperty'
import { ProductVariant } from './ProductVariant'
import { WithMetadata } from './QueryResponse'

export type ProductSelectionFormData = {
  variant?: WithMetadata<ProductVariant> & {
    quantity: number
  }
  properties?: Array<
    WithMetadata<ProductProperty> & {
      quantity: number
    }
  >
}
