import { Fieldset, Flex, Text } from '@mantine/core'
import React from 'react'
import { useWatch } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'

import ProductVariantSelection from './ProductVariantSelection'

const ProductVariants: React.FC<{
  showImages?: boolean
  isFromCartModal?: boolean
  maxPropertySelected?: boolean
  setVariantChanged: (bool: boolean) => void
  borderIsRed: { active: boolean; label: string }
  handleSetBorderRedTemporarily: (label: string, time?: number) => void
}> = ({
  showImages,
  setVariantChanged,
  isFromCartModal,
  maxPropertySelected,
  borderIsRed,
  handleSetBorderRedTemporarily,
}) => {
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
        {variants?.map((productVariant, i) => (
          <ProductVariantSelection
            key={productVariant.id}
            index={i}
            variant={productVariant}
            showImage={showImages}
            setVariantChanged={setVariantChanged}
            isFromCartModal={isFromCartModal}
            maxPropertySelected={maxPropertySelected}
            borderIsRed={borderIsRed}
            handleSetBorderRedTemporarily={handleSetBorderRedTemporarily}
          />
        ))}
      </Flex>
      {borderIsRed.active && borderIsRed.label === 'First remove flavor below' && (
        <Text c={'red'} fw={300} fz={'sm'} mt={6} pb={0} mb={0}>
          {borderIsRed.label}
        </Text>
      )}
    </Fieldset>
  )
}

export default ProductVariants
