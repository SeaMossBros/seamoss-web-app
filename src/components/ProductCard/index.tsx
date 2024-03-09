'use client'

import {
  AspectRatio,
  Button,
  Card,
  Group,
  Image,
  Indicator,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import minBy from 'lodash/minBy'
import Link from 'next/link'
import React, { useCallback, useMemo, useState } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/types/Product'
import { getStrapiUploadUrl } from '@/utils/cms'
import { formatPrice } from '@/utils/price'

// import ToolTip from '../ToolTip'
import { actionsContainer, card, productName } from './ProductCard.css'

export type ProductCardProps = {
  product: Product
  onQuickViewClick: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickViewClick }) => {
  const { isAddingToCart } = useCart()
  const { colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const getCorrectPrimaryColor = () => (isDarkTheme ? '#f5f5f5' : colors.teal[9])
  const [isHovering, setIsHovering] = useState(false)

  const productUrl = useMemo(
    () => ROUTE_PATHS.PRODUCT.SLUG.replaceAll('{slug}', product.attributes.slug),
    [product.attributes.slug],
  )

  const clickedQuickView = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()
      e.preventDefault()
      onQuickViewClick(product)
    },
    [onQuickViewClick, product],
  )

  const thumbnail = useMemo(() => {
    return (
      product.attributes.thumbnail?.data?.attributes.formats?.small ||
      product.attributes.thumbnail?.data?.attributes.formats?.thumbnail ||
      product.attributes.images?.data?.[0]?.attributes
    )
  }, [
    product.attributes.images?.data,
    product.attributes.thumbnail?.data?.attributes.formats?.small,
    product.attributes.thumbnail?.data?.attributes.formats?.thumbnail,
  ])

  const lowestPrice = useMemo(() => {
    const lowestPriceVariant = minBy(
      product.attributes.product_variants?.data ?? [],
      (variant: any) => {
        if (!variant.attributes.unit_price) return Infinity
        return variant.attributes.unit_price
      },
    )

    if (!lowestPriceVariant?.attributes.unit_price) return null

    return lowestPriceVariant.attributes.unit_price
  }, [product.attributes.product_variants])

  const isInStock = useMemo(() => {
    return product.attributes.product_variants?.data?.some((variant) => !!variant.attributes.stock)
  }, [product.attributes.product_variants?.data])

  return (
    <Card
      className={card}
      withBorder
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ border: `1px solid ${colors.teal[9]}` }}
    >
      <Card.Section
        component={Link}
        href={productUrl}
        style={{ backgroundColor: colors.teal[9], paddingBottom: '2px' }}
      >
        <AspectRatio ratio={1}>
          <Image
            src={thumbnail?.url ? getStrapiUploadUrl(thumbnail.url) : undefined}
            style={{ boxShadow: isHovering ? `2px 3px 12px 2px ${colors}` : 'none' }}
            alt={product.attributes.name}
            height={250}
            width={350}
            fallbackSrc="/images/placeholder.webp"
            fit="fill"
            loading="eager"
          />
        </AspectRatio>
      </Card.Section>
      <Stack mt="sm" h={130}>
        <Stack gap={0}>
          {/* <ToolTip title={'Product Name:\n' + product.attributes.name}> */}
          <Text
            className={productName}
            component={Link}
            href={productUrl}
            lineClamp={2}
            c={isDarkTheme ? '#f5f5f5' : 'dark'}
          >
            {product.attributes.name}
          </Text>
          {/* </ToolTip> */}
          <Indicator
            ml={6}
            position="middle-start"
            processing={isInStock}
            color={isInStock ? colors.teal[9] : colors.red[9]}
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Text fz="sm" ml="md" c={isDarkTheme ? '#f5f5f5' : 'black'}>
              {isInStock ? 'In stock' : 'Out of stock'}
            </Text>
          </Indicator>
          <Group className={actionsContainer} justify="space-between" gap={0}>
            <Text fz="sm" c={isDarkTheme ? '#f5f5f5' : 'black'} my={3}>
              Starting at {formatPrice(lowestPrice)}
            </Text>
            <Button
              onClick={(e) => clickedQuickView(e)}
              loading={isAddingToCart}
              variant="outline"
              c={getCorrectPrimaryColor()}
              style={{ borderColor: colors.teal[9] }}
            >
              Quick View
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Card>
  )
}

export default ProductCard
