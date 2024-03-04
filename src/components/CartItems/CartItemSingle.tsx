import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Collapse,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { modals } from '@mantine/modals'
import { IconChevronDown, IconChevronUp, IconTrash } from '@tabler/icons-react'
import { useCallback } from 'react'
import { Pencil } from 'tabler-icons-react'

import { useRemoveCartItem } from '@/mutations/useRemoveCartItem'
import { CartItem } from '@/types/CartItem'
import { PurchaseType } from '@/types/PurchaseOption'
import { getStrapiUploadUrl } from '@/utils/cms'
import { formatPrice } from '@/utils/price'

import { itemInfoWrapper, priceInfoWrapper, productImg } from './CartItemSingle.css'

export type CartItemSingleProps = {
  item: CartItem
  total: number | null
  discountedPrice: number | null
  onRefetch: () => void
  onRequestUpdate: (item: CartItem) => void
}

const CartItemSingle: React.FC<CartItemSingleProps> = ({
  item,
  total,
  discountedPrice,
  onRefetch,
  onRequestUpdate,
}) => {
  const [optionsExpanded, optionsSection] = useDisclosure(false)

  const { remove } = useRemoveCartItem()

  const onEditClick = useCallback(() => {
    onRequestUpdate(item)
  }, [item, onRequestUpdate])

  const onRemove = useCallback(() => {
    modals.openConfirmModal({
      title: 'Confirm remove item',
      children: <Text>You are about to remove this item from the cart. Are you sure?</Text>,
      labels: {
        confirm: 'Yes, remove',
        cancel: 'No, I made a mistake',
      },
      confirmProps: {
        variant: 'default',
      },
      cancelProps: {
        variant: 'fill',
        bg: 'red',
      },
      onConfirm: () => {
        remove(item.id, {
          onSuccess: () => {
            onRefetch()
          },
        })
      },
    })
  }, [item.id, onRefetch, remove])

  const {
    attributes: { product, purchase_option, options },
  } = item

  if (!product?.data) return null

  const {
    attributes: { name: productName, thumbnail },
  } = product.data

  if (!purchase_option?.data) return null

  const {
    attributes: { type: purchaseType, name: purchaseOptionName },
  } = purchase_option?.data

  return (
    <Card withBorder>
      <Flex gap="md" w="100%">
        <Image
          className={productImg}
          src={
            thumbnail?.data?.attributes?.formats?.small?.url
              ? getStrapiUploadUrl(
                  thumbnail.data.attributes.formats.small?.url ?? thumbnail.data.attributes.url,
                )
              : '/images/img-placeholder.webp'
          }
          width={70}
          height={70}
          alt={productName}
        />
        <Stack className={itemInfoWrapper} gap={0}>
          <Text fw={600} id="product-name">
            {productName}
          </Text>
          <Text fz="sm">
            {purchaseType === PurchaseType.Recurring ? purchaseOptionName : 'one-time purchase'}
          </Text>
          <Flex align="center">
            <Badge color="gray" size="sm" component="span">
              {options?.product_variant?.data?.attributes.name ?? ''}
            </Badge>{' '}
            <Text component="span" mx="xs">
              x
            </Text>
            <Text component="span" fz="sm">
              {options?.quantity ?? 1}
            </Text>
            <ActionIcon
              mx="md"
              ml="lg"
              variant="light"
              p={2}
              size="sm"
              type="button"
              onClick={onEditClick}
            >
              <Pencil />
            </ActionIcon>
            <ActionIcon
              type="button"
              variant="transparent"
              c="red"
              mx="md"
              size="sm"
              onClick={onRemove}
            >
              <IconTrash />
            </ActionIcon>
          </Flex>
          {options?.properties?.length ? (
            <Box>
              <Button
                variant="transparent"
                c="gray"
                p={0}
                size="sm"
                rightSection={
                  optionsExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />
                }
                onClick={optionsSection.toggle}
              >
                Options
              </Button>
              <Collapse in={optionsExpanded}>
                {options.properties.map((property) => (
                  <Text key={property.product_property?.data.id}>
                    <Text component="span" fz="sm">
                      {property.product_property?.data?.attributes.name ?? ''}
                    </Text>
                    <Text component="span" mx="xs">
                      x
                    </Text>
                    <Text component="span" fz="sm">
                      {property.quantity}
                    </Text>
                  </Text>
                ))}
              </Collapse>
            </Box>
          ) : null}
        </Stack>
        <Box className={priceInfoWrapper}>
          <Skeleton visible={!discountedPrice && !total} w="100%" ta="right">
            <Text c="teal" fw={600} ta="right" component="div">
              {formatPrice(discountedPrice ?? total)}
              {discountedPrice && total ? (
                <Text c="gray" td="line-through" fz="xs">
                  {formatPrice(total)}
                </Text>
              ) : null}
            </Text>
          </Skeleton>
        </Box>
      </Flex>
    </Card>
  )
}

export default CartItemSingle
