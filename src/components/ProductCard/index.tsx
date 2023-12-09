'use client'

import { Button, Card, Group, Image, Indicator, Stack, Text } from '@mantine/core'
import minBy from 'lodash/minBy'
import { default as NextImage } from 'next/image'
import Link from 'next/link'
import React, { useCallback, useMemo } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useCart } from '@/hooks/useCart'
import { Product } from '@/types/Product'
import { getStrapiUploadUrl } from '@/utils/cms'
import { formatPrice } from '@/utils/price'

import { actionsContainer, card, productName } from './ProductCard.css'

export type ProductCardProps = {
  product: Product
  onAddToCart: (product: Product) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { isAddingToCart } = useCart()

  const productUrl = useMemo(
    () => ROUTE_PATHS.PRODUCT.SLUG.replaceAll('{slug}', product.attributes.slug),
    [product.attributes.slug],
  )

  const onAddToCartClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()
      e.preventDefault()
      onAddToCart(product)
    },
    [onAddToCart, product],
  )

  const thumbnail = useMemo(() => {
    return (
      product.attributes.thumbnail?.data?.attributes.formats.small ??
      product.attributes.images?.data?.[0]?.attributes
    )
  }, [
    product.attributes.images?.data,
    product.attributes.thumbnail?.data?.attributes.formats.small,
  ])

  const lowestPrice = useMemo(() => {
    const lowestPriceVariant = minBy(
      product.attributes.product_variants?.data ?? [],
      (variant: any) => {
        if (!variant.attributes.unit_price) return Infinity
        return variant.attributes.unit_price * (variant.attributes.units_per_stock || 1)
      },
    )

    if (!lowestPriceVariant?.attributes.unit_price) return null

    return (
      lowestPriceVariant.attributes.unit_price *
      (lowestPriceVariant.attributes.units_per_stock || 1)
    )
  }, [product.attributes.product_variants])

  const isInStock = useMemo(() => {
    return product.attributes.product_variants?.data?.some((variant) => !!variant.attributes.stock)
  }, [product.attributes.product_variants?.data])

  return (
    <Card className={card} h={400} withBorder>
      <Card.Section component={Link} href={productUrl}>
        <Image
          src={thumbnail?.url ? getStrapiUploadUrl(thumbnail.url) : undefined}
          alt={product.attributes.name}
          component={NextImage}
          height={250}
          width={350}
          fallbackSrc="/images/placeholder.webp"
          fit="fill"
          priority
        />
      </Card.Section>
      <Stack mt="sm">
        <Stack gap={0}>
          <Text
            className={productName}
            component={Link}
            href={productUrl}
            title={product.attributes.name}
            lineClamp={2}
            c="primary-green"
          >
            {product.attributes.name}
          </Text>
          <Indicator
            position="middle-start"
            processing={isInStock}
            color={isInStock ? 'primary-green' : 'red'}
          >
            <Text fz="sm" ml="md">
              {isInStock ? 'In stock' : 'Out of stock'}
            </Text>
          </Indicator>
          <Group className={actionsContainer} justify="space-between" gap={0}>
            <Text fz="sm" c="primary-green">
              From {formatPrice(lowestPrice)}
            </Text>
            <Button onClick={(e) => onAddToCartClick(e)} loading={isAddingToCart}>
              Add to cart
            </Button>
          </Group>
        </Stack>
      </Stack>
    </Card>
  )
}

export default ProductCard
