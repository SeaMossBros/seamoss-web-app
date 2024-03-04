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
    [selectedIndex, selectedProperties],
  )

  const max = useMemo(() => {
    if (!variant) return undefined
    const {
      quantity,
      attributes: { units_per_stock = 1 },
    } = variant

    const totalUnits = quantity * units_per_stock

    const selectedUnitsCount = selectedProperties.reduce<number>((sum, p) => {
      if (p.id === property.id) return sum
      return sum + p.quantity
    }, 0)

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

  return (
    <Box className={propertySelectionContainer}>
      <Card
        className={propertyWrapper}
        data-selected={!!selected}
        data-disabled={!max}
        onClick={() => onSelect()}
        data-withimage={showImage}
        style={{ borderColor: !!selected ? colors.teal[9] : 'lightgray', userSelect: 'none' }}
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
            leftSection={
              <IconMinus
                role="button"
                size={12}
                onClick={(e) => {
                  e.stopPropagation()
                  quantityInput.current?.decrement()
                }}
              />
            }
            rightSection={
              <IconPlus
                role="button"
                size={12}
                onClick={(e) => {
                  e.stopPropagation()
                  quantityInput.current?.increment()
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
