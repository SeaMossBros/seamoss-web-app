import { Fieldset, Flex, Text } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'

import ProductPropertySelection from './ProductPropertySelection'

const ProductProperties: React.FC<{
  showImages?: boolean
  isFromCartModal: boolean
  setPropertyIsSelected: (bool: boolean) => void
}> = ({ showImages, isFromCartModal, setPropertyIsSelected }) => {
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

  const [quantityHasNotChanged, setQuantityHasNotChanged] = useState(true)
  const [sumArray, setSumArray] = useState<number[]>([])
  const [sum, setSum] = useState<number>(0)

  const getIsFromCartModal = () => {
    return isFromCartModal && quantityHasNotChanged
  }

  const selectedMaxAmount = () => {
    return sum !== variant?.quantity
  }

  const variantCountIsFilled = (): boolean => {
    return !!(
      !getIsFromCartModal() &&
      sum !== null &&
      !isNaN(sum) &&
      selectedMaxAmount() &&
      sumArray.length &&
      sumArray.some((num) => num + 1 > 0)
    )
  }

  useMemo(() => {
    let summedQuantities = 0
    sumArray.forEach((quantity) => (summedQuantities += quantity))
    setSum(summedQuantities)
  }, [sumArray])

  useMemo(() => {
    selectedProperties.map((property) => remove(property.id))
    setSumArray(Array(sumArray.length).fill(0))
  }, [variant?.id, remove])

  useEffect(() => {
    setSumArray(Array(product?.attributes.product_properties?.data?.length).fill(0))
  }, [product?.attributes.product_properties?.data])

  useEffect(() => {
    sumArray.length && setQuantityHasNotChanged(false)
    setPropertyIsSelected(variantCountIsFilled())
  }, [variant?.id, sumArray, setPropertyIsSelected])

  if (!product || !variant) return null

  const { attributes } = product

  const updateQuantitySum = (num: number, id: number) => {
    setQuantityHasNotChanged(false)
    const index = attributes.product_properties?.data?.findIndex((property) => property.id === id)

    setSumArray((prev) => {
      const newArraySum = [...prev]
      newArraySum[index] = num
      return newArraySum
    })
    const countIsFilled = variantCountIsFilled()
    setPropertyIsSelected(countIsFilled)
  }

  return (
    <Fieldset
      legend={attributes.unit_property_selection_text || 'Select Properties'}
      style={{
        borderColor: !getIsFromCartModal() && variant.quantity - sum > 0 ? 'red' : '#373a40',
        borderWidth: '1px',
        userSelect: 'none',
      }}
    >
      {variantCountIsFilled() && (
        <Text c={'red'} style={{ userSelect: 'none' }}>
          Choose {variant.quantity - sum} before you continue!
        </Text>
      )}
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
            updateQuantitySum={updateQuantitySum}
          />
        ))}
      </Flex>
    </Fieldset>
  )
}

export default ProductProperties
