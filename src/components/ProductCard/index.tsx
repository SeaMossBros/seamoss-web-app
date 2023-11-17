'use client'

import { Anchor, Button, Card, Group, Image, Indicator, Stack, Text } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import minBy from 'lodash/minBy'
import { default as NextImage } from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { Product } from '@/types/Product'
import { WithMetadata } from '@/types/QueryResponse'
import { getStrapiUploadUrl } from '@/utils/cms'
import { formatPrice } from '@/utils/price'

import { actionsContainer, card } from './ProductCard.css'

export type ProductCardProps = {
  product: WithMetadata<Product>
  onAddToCart: (product: WithMetadata<Product>) => void
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { ref, hovered } = useHover()
  const router = useRouter();

  const productUrl = useMemo(
    () => ROUTE_PATHS.PRODUCT.SLUG.replaceAll('{slug}', product.attributes.slug),
    [product.attributes.slug],
  )

  const onAddToCartClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation()
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
    const lowestPriceVariant = minBy(product.attributes.product_variants?.data ?? [], (variant) => {
      if (!variant.attributes.unit_price) return Infinity
      return variant.attributes.unit_price * (variant.attributes.units_per_stock || 1)
    })

    if (!lowestPriceVariant?.attributes.unit_price) return null

    return (
      lowestPriceVariant.attributes.unit_price *
      (lowestPriceVariant.attributes.units_per_stock || 1)
    )
  }, [product.attributes.product_variants])

  const isInStock = useMemo(() => {
    return product.attributes.product_variants?.data?.some((variant) => !!variant.attributes.stock)
  }, [product.attributes.product_variants?.data])

  const onClick = useCallback(() => {
    router.push(productUrl);
  }, [productUrl, router])

  return (
    <Card
      ref={ref}
      onClick={() => onClick()}
      className={card}
      h={400}
      shadow={hovered ? 'lg' : undefined}
      withBorder
    >
      <Card.Section>
        <Image
          src={thumbnail?.url ? getStrapiUploadUrl(thumbnail.url) : '/images/placeholder.webp'}
          alt={product.name}
          component={NextImage}
          height={250}
          width={350}
          fit="fill"
          priority
        />
      </Card.Section>
      <Stack mt="sm">
        <Stack gap={0}>
          <Anchor
            title={product.attributes.name}
            component={Link}
            href={productUrl}
            lineClamp={2}
            c="secondary-gray"
          >
            {product.attributes.name}
          </Anchor>
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
