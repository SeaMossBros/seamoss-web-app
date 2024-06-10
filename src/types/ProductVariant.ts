import { Media } from './Media'

export enum WeightUnit {
  Oz = 'oz',
  FlOz = 'fl oz',
}
export enum Sku {
  SmDry4Oz = 'SM-DRY-4-OZ',
  SmDry8Oz = 'SM-DRY-8-OZ',
}
export enum PackageDimensionsUnit {
  In = 'in',
  Cm = 'cm',
  Ft = 'ft',
}
export enum PackageDimensions {
  W8xL12xH4 = 'W8xL12xH4',
  W8xL12xH8 = 'W8xL12xH8',
}

export interface ProductVariant {
  id: number
  attributes: {
    createdAt: string
    updatedAt: string
    publishedAt?: string
    name: string
    unit_price?: number
    product?: { data: import('./Product').Product }
    is_default?: boolean
    stock?: number
    units_per_stock?: number
    image?: { data: Media }
    weight?: number
    weight_unit?: WeightUnit
    sku?: Sku
    package_dimensions_unit?: PackageDimensionsUnit
    package_dimensions?: PackageDimensions
  }
}

export interface ProductVariant_Plain {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  unit_price?: number
  product?: import('./Product').Product_Plain
  is_default?: boolean
  stock?: number
  units_per_stock?: number
  image?: Media
  weight?: number
  weight_unit?: WeightUnit
  sku?: Sku
  package_dimensions_unit?: PackageDimensionsUnit
  package_dimensions?: PackageDimensions
}

export interface ProductVariant_NoRelations {
  id: number
  createdAt: string
  updatedAt: string
  publishedAt?: string
  name: string
  unit_price?: number
  product?: number
  is_default?: boolean
  stock?: number
  units_per_stock?: number
  image?: number
  weight?: number
  weight_unit?: WeightUnit
  sku?: Sku
  package_dimensions_unit?: PackageDimensionsUnit
  package_dimensions?: PackageDimensions
}
