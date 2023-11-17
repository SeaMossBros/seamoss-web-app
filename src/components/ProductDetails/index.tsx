'use client'

import { Stack, Title } from '@mantine/core'

import { Product } from '@/types/Product'
import { WithMetadata } from '@/types/QueryResponse'

import ProductProperties from './ProductProperties'
import ProductVariants from './ProductVariants'
import PurchaseOptions from './PurchaseOptions'
import TotalPrice from './TotalPrice'

export type ProductDetailsProps = {
  product: WithMetadata<Product>
  showOptionImages?: boolean
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, showOptionImages = true }) => {
  const { attributes } = product

  return (
    <Stack>
      <Title>{attributes.name}</Title>
      <TotalPrice />
      {attributes.product_variants?.data?.length ? (
        <ProductVariants showImages={showOptionImages} />
      ) : null}
      {attributes.product_properties?.data?.length ? (
        <ProductProperties showImages={showOptionImages} />
      ) : null}
      {attributes.purchase_options?.data?.length ? <PurchaseOptions /> : null}
    </Stack>
  )
}

export default ProductDetails
