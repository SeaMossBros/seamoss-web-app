export enum PurchaseType {
  Recurring = 'recurring',
  OneTime = 'one_time',
}
export enum DiscountUnit {
  Fiat = 'fiat',
  Percentage = 'percentage',
}

export interface PurchaseOption {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    name: string
    type: PurchaseType
    has_discount?: boolean
    discount_value?: number
    discount_unit?: DiscountUnit
    products?: { data: import('./Product').Product[] }
  }
}
export interface PurchaseOption_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  type: PurchaseType
  has_discount?: boolean
  discount_value?: number
  discount_unit?: DiscountUnit
  products?: import('./Product').Product_Plain[]
}

export interface PurchaseOption_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  type: PurchaseType
  has_discount?: boolean
  discount_value?: number
  discount_unit?: DiscountUnit
  products?: number[]
}
