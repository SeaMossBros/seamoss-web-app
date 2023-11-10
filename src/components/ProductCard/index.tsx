'use client'

import { Anchor, Card, Image, Stack, Text } from "@mantine/core"
import { default as NextImage } from "next/image"
import Link from "next/link"

import { ROUTE_PATHS } from "@/consts/route-paths"
import { Product } from "@/types/Product"
import { getStrapiUploadUrl } from "@/utils/cms"

export type ProductCardProps = {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const thumbnail = product.images?.data[0]?.attributes

  return (
    <Card h={350} withBorder>
      <Stack gap={0}>
        <Card.Section h={170}>
          <Image
            src={thumbnail?.url ? getStrapiUploadUrl(thumbnail.url) : '/images/img-placeholder.webp'}
            alt={product.name}
            component={NextImage}
            objectFit="cover"
            fill
            mah={170}
          />
        </Card.Section>
        <Stack gap={0}>
          <Anchor
            title={product.name}
            component={Link}
            href={ROUTE_PATHS.PRODUCT.INDEX}
            lineClamp={2}
            c="secondary-gray"
          >
            {product.name}
          </Anchor>
          <Text c="primary-green">${product.price}</Text>
        </Stack>
      </Stack>
    </Card>
  )
}

export default ProductCard