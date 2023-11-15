'use client'

import { Fieldset, Flex, Stack, Title } from '@mantine/core'

import { Product } from '@/types/Product'
import { WithMetadata } from '@/types/QueryResponse'

import ProductProperties from './ProductProperties'
import ProductVariantSelection from './ProductVariantSelection'
import PurchaseOptions from './PurchaseOptions'
import TotalPrice from './TotalPrice'

export type ProductDetailsProps = {
  product: WithMetadata<Product>
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const { attributes } = product

  return (
    <Stack>
      <Title>{attributes.name}</Title>
      <TotalPrice />
      {attributes.product_variants?.data?.length ? (
        <Fieldset legend={attributes.variant_selection_text || 'Select Variant'}>
          <Flex gap="sm" wrap="wrap">
            {attributes.product_variants?.data?.map((productVariant) => (
              <ProductVariantSelection key={productVariant.id} variant={productVariant} />
            ))}
          </Flex>
        </Fieldset>
      ) : null}
      {attributes.product_properties?.data?.length ? <ProductProperties /> : null}
      {attributes.purchase_options?.data?.length ? <PurchaseOptions /> : null}
    </Stack>
  )
}

export default ProductDetails
