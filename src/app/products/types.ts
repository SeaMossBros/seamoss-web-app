import { Category } from '@/types/Product'

export type ProductPageFilter = {
  category?: Category[]
  price_from?: number
  price_to?: number
  rating?: number
}
