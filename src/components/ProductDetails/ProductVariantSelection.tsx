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
import { useCallback, useEffect, useRef } from 'react'
import { useFormContext } from 'react-hook-form'

import { ProductSelectionFormData } from '@/types/ProductForm'
import { ProductVariant } from '@/types/ProductVariant'
import { getStrapiUploadUrl } from '@/utils/cms'

import {
  quantityControl,
  quantitySelection,
  quantitySelectionInput,
  variantSelectionContainer,
  variantWrapper,
} from './ProductVariantSelection.css'

export type ProductVariantSelectionProps = {
  variant: ProductVariant
  showImage?: boolean
  isFromCartModal?: boolean
  maxPropertySelected?: boolean
  setVariantChanged: (bool: boolean) => void
  index: number
  borderIsRed: { active: boolean; label: string }
  handleSetBorderRedTemporarily: (label: string, time?: number) => void
}

const ProductVariantSelection: React.FC<ProductVariantSelectionProps> = ({
  variant,
  showImage,
  setVariantChanged,
  index,
  isFromCartModal,
  maxPropertySelected,
  handleSetBorderRedTemporarily,
  borderIsRed,
}) => {
  const { colors } = useMantineTheme()
  const { attributes } = variant

  const methods = useFormContext<ProductSelectionFormData>()

  const selectedVariant = methods.watch('variant')

  const quantityInput = useRef<NumberInputHandlers>(null)

  const onChangeQuantity = useCallback(
    (value: number | string) => {
      methods.setValue('variant.quantity', typeof value === 'string' ? parseInt(value) : value)
    },
    [methods],
  )

  const onSelect = useCallback(() => {
    methods.setValue('variant', {
      ...variant,
      quantity: 1,
    })
    setVariantChanged(true)
  }, [methods, variant])

  useEffect(() => {
    !isFromCartModal && index === 0 && onSelect()
  }, [])

  const isSelected = variant.id === selectedVariant?.id

  return (
    <Box className={variantSelectionContainer}>
      <Card
        className={variantWrapper}
        data-selected={isSelected}
        onClick={() => (!isSelected ? onSelect() : undefined)}
        withBorder
        style={{
          transition: '0.24s ease-in-out',
          borderColor: isSelected
            ? borderIsRed.active
              ? colors.red[9]
              : colors.teal[9]
            : 'lightgray',
        }}
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
      {isSelected ? (
        <Flex justify="center" mt="xs" style={{ border: 'none' }}>
          <NumberInput
            hideControls
            handlersRef={quantityInput}
            size="xs"
            classNames={{
              root: quantitySelection,
              input: quantitySelectionInput,
              section: quantityControl,
            }}
            value={selectedVariant?.quantity}
            onChange={onChangeQuantity}
            step={1}
            min={1}
            defaultValue={1}
            allowNegative={false}
            readOnly
            leftSection={
              <IconMinus
                size={15}
                onClick={() => {
                  if (!isFromCartModal && maxPropertySelected) {
                    handleSetBorderRedTemporarily('First remove flavor below')
                  } else {
                    quantityInput.current?.decrement()
                  }
                }}
              />
            }
            rightSection={
              <IconPlus
                size={15}
                onClick={() => {
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

export default ProductVariantSelection
