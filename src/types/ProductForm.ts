import { Product } from './Product'
import { ProductProperty } from './ProductProperty'
import { ProductVariant } from './ProductVariant'
import { PurchaseOption } from './PurchaseOption'

export type ProductSelectionFormData = {
  totalPrice: number | null
  discountedPrice: number | null
  product: Product
  variant: ProductVariant & {
    quantity: number
  }
  properties?: Array<
    ProductProperty & {
      quantity: number
    }
  >
  purchaseOption?: PurchaseOption
}
