'use client'

import { Rating, Stack, Title } from '@mantine/core'

import { Product } from '@/types/Product'

import ProductProperties from './ProductProperties'
import ProductVariants from './ProductVariants'
import PurchaseOptions from './PurchaseOptions'
import TotalPrice from './TotalPrice'
import { ProductProperty } from '@/types/ProductProperty'
import { ProductVariant } from '@/types/ProductVariant'

export type ProductDetailsProps = {
  product: Product
  showOptionImages?: boolean
  isFromCartModal?: boolean
  setPropertyIsSelected: Function
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  showOptionImages = true,
  isFromCartModal = false,
  setPropertyIsSelected,
}) => {
  const { attributes } = product

  return (
    <Stack>
      <Title>{attributes.name}</Title>
      <Rating value={attributes.rating ?? 0} fractions={100} readOnly />
      <TotalPrice /> 
      {attributes.product_variants?.data?.length ? (
        <ProductVariants showImages={showOptionImages} />
      ) : null}
      {attributes.product_properties?.data?.length ? (
        <ProductProperties
          showImages={showOptionImages}
          isFromCartModal={isFromCartModal}
          setPropertyIsSelected={setPropertyIsSelected}
        />
      ) : null}
      {attributes.purchase_options?.data?.length ? <PurchaseOptions /> : null}
    </Stack>
  )
}

export default ProductDetails
