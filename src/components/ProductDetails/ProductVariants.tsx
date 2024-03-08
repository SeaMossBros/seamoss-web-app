import { Fieldset, Flex } from '@mantine/core'
import React from 'react'
import { useWatch } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'

import ProductVariantSelection from './ProductVariantSelection'

const ProductVariants: React.FC<{
  showImages?: boolean
  setVariantChanged: (bool: boolean) => void
}> = ({ showImages, setVariantChanged }) => {
  const fieldsetLegend = useWatch<
    ProductSelectionFormData,
    'product.attributes.variant_selection_text'
  >({
    name: 'product.attributes.variant_selection_text',
  })

  const variants = useWatch<ProductSelectionFormData, 'product.attributes.product_variants.data'>({
    name: 'product.attributes.product_variants.data',
  })

  return (
    <Fieldset legend={fieldsetLegend || 'Select Variant'} style={{ userSelect: 'none' }}>
      <Flex gap="sm" wrap="wrap">
        {variants?.map((productVariant) => (
          <ProductVariantSelection
            key={productVariant.id}
            variant={productVariant}
            showImage={showImages}
            setVariantChanged={setVariantChanged}
          />
        ))}
      </Flex>
    </Fieldset>
  )
}

export default ProductVariants
