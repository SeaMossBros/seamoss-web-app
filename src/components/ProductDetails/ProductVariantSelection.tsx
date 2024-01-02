import { Box, Card, Flex, Image, NumberInput, NumberInputHandlers, Text, useMantineTheme, useMantineColorScheme } from '@mantine/core'
import { IconMinus, IconPlus } from '@tabler/icons-react'
import { useCallback, useRef } from 'react'
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
}

const ProductVariantSelection: React.FC<ProductVariantSelectionProps> = ({
  variant,
  showImage,
}) => {
  const { colors, defaultRadius } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const getCorrectPrimaryColor = () => isDarkTheme ? colors.red[6] : colors.teal[7];
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
  }, [methods, variant])

  const isSelected = variant.id === selectedVariant?.id

  return (
    <Box className={variantSelectionContainer}>
      <Card className={variantWrapper} data-selected={isSelected} onClick={onSelect} withBorder style={{borderColor: getCorrectPrimaryColor()}}>
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
        <Flex justify="center" mt="xs" style={{border: 'none'}}>
          <NumberInput
            hideControls
            handlersRef={quantityInput}
            size="xs"
            classNames={{
              root: quantitySelection,
              input: quantitySelectionInput,
              section: quantityControl,
            }}
            style={{
              borderSize: '1px',
              borderStyle: 'solid',
              borderColor: isDarkTheme ? colors.red[6] : colors.teal[7],
              borderRadius: defaultRadius
            }}
            value={selectedVariant?.quantity}
            onChange={onChangeQuantity}
            step={1}
            min={1}
            defaultValue={1}
            allowNegative={false}
            leftSection={
              <IconMinus
                size={15}
                onClick={() => {
                  quantityInput.current?.decrement()
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
