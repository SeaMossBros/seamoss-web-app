import { Fieldset, Flex, Text } from '@mantine/core'
import { useEffect, useMemo, useState } from 'react'
import { useFieldArray, useWatch } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'

import ProductPropertySelection from './ProductPropertySelection'

const ProductProperties: React.FC<{
  showImages?: boolean
  isFromCartModal: boolean
  variantChanged?: boolean
  setMaxPropertySelected: (bool: boolean) => void
  setVariantChanged: (bool: boolean) => void
  handleSetBorderRedTemporarily: (label: string) => void
  borderIsRed: { active: boolean; label: string }
}> = ({
  showImages,
  isFromCartModal,
  setMaxPropertySelected,
  setVariantChanged,
  variantChanged,
  handleSetBorderRedTemporarily,
  borderIsRed,
}) => {
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

  const [sumArray, setSumArray] = useState<number[]>([])

  const selectedMaxAmount = () => {
    let summedQuantities = 0
    sumArray.forEach((quantity) => (summedQuantities += quantity))
    return summedQuantities === variant?.quantity
  }

  const getRemainingAmountToSelect = () => {
    let summedQuantities = 0
    sumArray.forEach((quantity) => (summedQuantities += quantity))
    return summedQuantities
  }

  const variantCountIsFilled = (): boolean => {
    const bool = !!(
      isFromCartModal &&
      selectedMaxAmount() &&
      sumArray.length &&
      sumArray.some((num) => num + 1 > 0)
    )
    setMaxPropertySelected(bool || (variant && variant.quantity === getRemainingAmountToSelect()))
    return bool
  }

  useMemo(() => {
    selectedProperties.map((property) => remove(property.id))
    setSumArray(Array(sumArray.length).fill(0))
  }, [variant?.id, remove])

  // useMemo(() => {
  //   selectedProperties.map((property) => property.quantity === 1 ? remove(property.quantity) : null)
  // }, [variant?.quantity])

  useEffect(() => {
    if (!isFromCartModal) {
      setSumArray(Array(product?.attributes.product_properties?.data?.length).fill(0))
    }
  }, [product?.attributes.product_properties?.data.length])

  const updateQuantitySum = (num: number, id: number) => {
    const index = selectedProperties.findIndex((property) => property.id === id)
    if (index === -1) {
      setSumArray((prev) => {
        const newArray: number[] = []
        prev.map((num) => (num > 0 ? newArray.push(num) : null))
        return [...newArray, num]
      })
      return
    }

    let sum = 0
    sumArray.forEach((number, i) => {
      index !== i ? (sum += number) : null
    })
    if (!variant?.quantity || num + sum > variant.quantity) return

    setSumArray((prev) => {
      const newArraySum: number[] = [...prev]
      newArraySum[index] = num
      if (num === 0) newArraySum.splice(index, 1)
      return newArraySum
    })
  }

  useEffect(() => {
    const sumOfQuants = sumArray.reduce((partialSum, a) => partialSum + a, 0)
    const sumOfSelectedQuants = selectedProperties.reduce(
      (partialSum, a) => partialSum + a.quantity,
      0,
    )
    console.log('sumOfQuants', sumOfQuants)
    console.log('sumOfSelectedQuants', sumOfSelectedQuants)
    if (
      isFromCartModal &&
      sumOfQuants === sumOfSelectedQuants &&
      variant?.quantity === sumOfQuants - 1
    ) {
      const lastIndex = selectedProperties.length - 1
      selectedProperties.forEach((property, i) => {
        if (i === lastIndex) {
          console.log('property.quantity', property.quantity)
          updateQuantitySum(property.quantity - 1, property.id)
          // property.quantity === 1 ? remove(property.id)
          update(i, { ...property, quantity: property.quantity - 1 })
        }
      })
    } else if (isFromCartModal) {
      selectedProperties.forEach((property) => {
        updateQuantitySum(property.quantity, property.id)
      })
    }
  }, [variant?.quantity])

  const sum = useMemo(() => {
    const sumOfQuants = sumArray.reduce((partialSum, a) => partialSum + a, 0)
    variantCountIsFilled()
    return sumOfQuants
  }, [sumArray])

  if (!product?.attributes || !variant) return null

  const { attributes } = product
  const showWarnings = !variantCountIsFilled() && variant.quantity !== getRemainingAmountToSelect()
  const remaining = variant.quantity - getRemainingAmountToSelect()

  return (
    <Fieldset
      legend={attributes.unit_property_selection_text || 'Select Properties'}
      style={{
        borderColor: showWarnings ? 'red' : '',
        borderWidth: '1px',
        userSelect: 'none',
      }}
    >
      {showWarnings && (
        <Text c={'red'} style={{ userSelect: 'none' }}>
          Add {remaining} more before you continue!
        </Text>
      )}
      {borderIsRed.active && borderIsRed.label !== 'First remove flavor below' && (
        <Text c={'red'} fw={300} fz={'sm'} mb={6}>
          {borderIsRed.label}
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
            sum={sum}
            variantChanged={variantChanged}
            setVariantChanged={setVariantChanged}
            handleSetBorderRedTemporarily={handleSetBorderRedTemporarily}
            borderIsRed={borderIsRed}
          />
        ))}
      </Flex>
    </Fieldset>
  )
}

export default ProductProperties
