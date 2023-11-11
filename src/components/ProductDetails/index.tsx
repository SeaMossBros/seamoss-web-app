'use client'

import { List, ListItem, Stack, Text, Title } from "@mantine/core"
import { useMemo } from "react"

import { Product } from "@/types/Product"
import { ProductVariant } from "@/types/ProductVariant"
import { WithMetadata } from "@/types/QueryResponse"
import { formatPrice } from "@/utils/price"

export type ProductDetailsProps = {
  product: WithMetadata<Product>
  variant?: WithMetadata<ProductVariant>
  setVariant: (variant: WithMetadata<ProductVariant>) => void
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, variant }) => {
  const totalPrice = useMemo(() => {
    if (!variant) return null

    const { attributes: {
      unit_price,
      units_per_stock = 1
    } } = variant

    if (!unit_price) return null
    return unit_price * units_per_stock
  }, [variant])

  return (
    <Stack>
      <Title>{product.attributes.name}</Title>
      <Text fz="xl" c="primary-green" fw={600}>{formatPrice(totalPrice)}</Text>
      <List type="ordered">
        <ListItem>
          <Text>{product.attributes.variant_selection_text || 'Select Variant'}</Text>
        </ListItem>
      </List>
    </Stack>
  )
}

export default ProductDetails