import { Fieldset, Flex } from '@mantine/core'
import { useFieldArray, useWatch } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'

import ProductPropertySelection from './ProductPropertySelection'

const ProductProperties: React.FC<{
  showImages?: boolean
}> = ({ showImages }) => {
  const product = useWatch<ProductSelectionFormData, 'product'>({
    name: 'product',
  })
  const variant = useWatch<ProductSelectionFormData, 'variant'>({
    name: 'variant',
  })

  const {
    fields: selectedProperties,
    append,
    update,
    remove,
  } = useFieldArray<ProductSelectionFormData, 'properties', 'key'>({
    name: 'properties',
    keyName: 'key',
  })

  if (!product) return null;

  const { attributes } = product;

  return (
    <Fieldset legend={attributes.unit_property_selection_text || 'Select Properties'}>
      <Flex gap="sm" wrap="wrap">
        {attributes.product_properties?.data?.map((property) => (
          <ProductPropertySelection
            key={property.id}
            property={property}
            variant={variant}
            selectedProperties={selectedProperties}
            append={append}
            remove={remove}
            update={update}
            showImage={showImages}
          />
        ))}
      </Flex>
    </Fieldset>
  )
}

export default ProductProperties
