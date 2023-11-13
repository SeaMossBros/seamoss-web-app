'use client'

import { Fieldset, Flex, Stack, Title } from '@mantine/core'

import { Product } from '@/types/Product'
import { WithMetadata } from '@/types/QueryResponse'

import ProductPropertySelection from './ProductPropertySelection'
import ProductVariantSelection from './ProductVariantSelection'
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
      {attributes.product_properties?.data?.length ? (
        <Fieldset legend={attributes.unit_property_selection_text || 'Select Properties'}>
          <Flex gap="sm" wrap="wrap">
            {attributes.product_properties.data.map((property) => (
              <ProductPropertySelection key={property.id} property={property} />
            ))}
          </Flex>
        </Fieldset>
      ) : null}
    </Stack>
  )
}

export default ProductDetails
