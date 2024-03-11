'use client'

import { Rating, Stack, Title } from '@mantine/core'
import { useState } from 'react'

import { Product } from '@/types/Product'

import ProductProperties from './ProductProperties'
import ProductVariants from './ProductVariants'
import PurchaseOptions from './PurchaseOptions'
import TotalPrice from './TotalPrice'

export type ProductDetailsProps = {
  product: Product
  showOptionImages?: boolean
  isFromCartModal?: boolean
  setMaxPropertySelected: (bool: boolean) => void
  shouldUpdatedAfterChange?: boolean
  setVariantChanged: (bool: boolean) => void
  variantChanged?: boolean
  maxPropertySelected?: boolean
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  showOptionImages = true,
  isFromCartModal = false,
  setMaxPropertySelected,
  setVariantChanged,
  variantChanged,
  maxPropertySelected,
}) => {
  const [borderIsRed, setBorderIsRed] = useState({ active: false, label: '' })

  const { attributes } = product

  const handleSetBorderRedTemporarily = (label: string, time: number = 1500) => {
    setBorderIsRed({ active: true, label })
    setTimeout(() => setBorderIsRed({ active: false, label: '' }), time)
  }

  return (
    <Stack>
      <Title>{attributes.name}</Title>
      <Rating value={attributes.rating ?? 0} fractions={100} readOnly />
      <TotalPrice />
      {attributes.product_variants?.data?.length ? (
        <ProductVariants
          showImages={showOptionImages}
          setVariantChanged={setVariantChanged}
          isFromCartModal={isFromCartModal}
          borderIsRed={borderIsRed}
          maxPropertySelected={maxPropertySelected}
          handleSetBorderRedTemporarily={handleSetBorderRedTemporarily}
        />
      ) : null}
      {attributes.product_properties?.data?.length ? (
        <ProductProperties
          showImages={showOptionImages}
          isFromCartModal={isFromCartModal}
          setMaxPropertySelected={setMaxPropertySelected}
          variantChanged={variantChanged}
          setVariantChanged={setVariantChanged}
          borderIsRed={borderIsRed}
          handleSetBorderRedTemporarily={handleSetBorderRedTemporarily}
        />
      ) : null}
      {attributes.purchase_options?.data?.length ? <PurchaseOptions /> : null}
    </Stack>
  )
}

export default ProductDetails
