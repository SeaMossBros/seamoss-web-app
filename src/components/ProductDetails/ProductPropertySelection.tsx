import {
  Box,
  Card,
  Flex,
  Image,
  NumberInput,
  NumberInputHandlers,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFieldArrayUpdate,
} from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'
import { ProductProperty } from '@/types/ProductProperty'
import { getStrapiUploadUrl } from '@/utils/cms'

import {
  propertySelectionContainer,
  propertyWrapper,
  quantityControl,
  quantitySelection,
  quantitySelectionInput,
} from './ProductPropertySelection.css'

export type ProductPropertySelectionProps = {
  property: ProductProperty
  selectedProperties: FieldArrayWithId<ProductSelectionFormData, 'properties', 'key'>[]
  append: UseFieldArrayAppend<ProductSelectionFormData, 'properties'>
  update: UseFieldArrayUpdate<ProductSelectionFormData, 'properties'>
  remove: UseFieldArrayRemove
  variant: ProductSelectionFormData['variant']
  showImage?: boolean
  updateQuantitySum: (num: number, id: number) => void
  sum: number
  variantChanged?: boolean
  setVariantChanged: (bool: boolean) => void
  borderIsRed: { active: boolean; label: string }
  handleSetBorderRedTemporarily: (label: string, time?: number) => void
}

const ProductPropertySelection: React.FC<ProductPropertySelectionProps> = ({
  property,
  variant,
  selectedProperties,
  append,
  update,
  remove,
  showImage,
  updateQuantitySum,
  sum,
  variantChanged,
  borderIsRed,
  handleSetBorderRedTemporarily,
  // setVariantChanged,
}) => {
  const { colors } = useMantineTheme()
  const { attributes } = property

  const quantityInput = useRef<NumberInputHandlers>(null)

  const selectedIndex = useMemo(
    () => selectedProperties.findIndex((p) => p.id === property.id),
    [property.id, selectedProperties],
  )

  const selected = useMemo(
    () => selectedProperties[selectedIndex],
    [selectedIndex, selectedProperties, sum],
  )

  useEffect(() => {
    if (variantChanged) {
      remove(selectedIndex)
    }
  }, [variant?.id, variantChanged])

  const max = useMemo(() => {
    if (!variant) return undefined
    const {
      quantity,
      attributes: { units_per_stock = 1 },
    } = variant

    const totalUnits = quantity * units_per_stock
    let selectedUnitsCount = selectedProperties.reduce<number>((sum, p) => {
      if (p.id === property.id) return sum
      return sum + p.quantity
    }, 0)

    if (selectedUnitsCount - 1 === quantity) {
      selectedUnitsCount = selectedUnitsCount - 1
      quantityInput.current?.decrement()
    }

    const availableStocks = totalUnits - selectedUnitsCount
    return availableStocks
  }, [property.id, selectedProperties, variant])

  useEffect(() => {
    if (max && max < 0) {
      remove(selectedIndex)
    }
  }, [max, remove, selectedIndex])

  const onSelect = useCallback(() => {
    if (!!selected) return
    if (!max) {
      handleSetBorderRedTemporarily('First increase the amount above or remove 1 flavor', 2100)
      return
    }
    append({
      ...property,
      quantity: 1,
    })
    updateQuantitySum(1, property.id)
  }, [append, property, selected, updateQuantitySum])

  const onChangeQuantity = useCallback(
    (value: number | string) => {
      if (!selected || selectedIndex < 0) return
      const num = parseInt(`${value}`)
      if (!num) {
        updateQuantitySum(0, property.id)
        remove(selectedIndex)
        return
      }
      updateQuantitySum(num, property.id)
      update(selectedIndex, {
        ...selected,
        quantity: num,
      })
    },
    [remove, selected, selectedIndex, update, property.id, updateQuantitySum],
  )

  // console.log('selected', selected)
  // console.log('selected?.quantity', selected?.quantity)
  const isSelected = () => !!selected && selected?.quantity > 0

  if (selected?.quantity === 0) {
    remove(selectedIndex)
  }

  return (
    <Box className={propertySelectionContainer}>
      <Card
        className={propertyWrapper}
        data-selected={!!selected}
        // data-disabled={!max}
        onClick={() => onSelect()}
        data-withimage={attributes.image?.data?.attributes.url && showImage}
        style={{
          transition: '0.24s ease-in-out',
          borderColor: isSelected()
            ? borderIsRed.active &&
              borderIsRed.label === 'First increase the amount above or remove 1 flavor'
              ? colors.red[9]
              : colors.teal[9]
            : 'lightgray',
          userSelect: 'none',
        }}
        withBorder
      >
        {attributes.image?.data?.attributes.url && showImage ? (
          <Box>
            <Image
              src={getStrapiUploadUrl(attributes.image.data.attributes.url)}
              alt={attributes.name}
              width={60}
              height={60}
              fit="contain"
            />
          </Box>
        ) : null}
        <Text fz="xs" ta="center">
          {attributes.name}
        </Text>
      </Card>
      {!!selected ? (
        <Flex justify="center" mt="xs">
          <NumberInput
            hideControls
            handlersRef={quantityInput}
            size="xs"
            classNames={{
              root: quantitySelection,
              input: quantitySelectionInput,
              section: quantityControl,
            }}
            value={selected?.quantity}
            onChange={onChangeQuantity}
            step={1}
            min={0}
            max={max}
            defaultValue={1}
            allowNegative={false}
            readOnly
            leftSection={
              <IconMinus
                role="button"
                size={12}
                onClick={(e) => {
                  e.stopPropagation()
                  sum > 0 && quantityInput.current?.decrement()
                }}
              />
            }
            rightSection={
              <IconPlus
                role="button"
                size={12}
                onClick={(e) => {
                  e.stopPropagation()
                  sum < variant?.quantity
                    ? quantityInput.current?.increment()
                    : handleSetBorderRedTemporarily('First increase the amount above')
                }}
              />
            }
          />
        </Flex>
      ) : null}
    </Box>
  )
}

export default ProductPropertySelection
