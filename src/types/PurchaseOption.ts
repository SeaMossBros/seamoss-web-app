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
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  type: PurchaseType
  has_discount?: boolean
  discount_value?: number
  discount_unit?: DiscountUnit
}
