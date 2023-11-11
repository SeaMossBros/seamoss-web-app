'use client'

import { Grid, Stack, Text, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo, useState } from "react"

import ProductDetails from "@/components/ProductDetails"
import ProductImages from "@/components/ProductImages"
import { useService } from "@/hooks/useService"
import ProductService from "@/services/product.service"
import { Product } from "@/types/Product"
import { ProductVariant } from "@/types/ProductVariant"
import { QueryParams } from "@/types/QueryParams"
import { WithMetadata } from "@/types/QueryResponse"
import { formatPrice } from "@/utils/price"

export type ProductSingleProps = {
  slug: string
  queryParams: QueryParams<Product>
}

const ProductSingle: React.FC<ProductSingleProps> = ({ slug, queryParams }) => {
  const productService = useService(ProductService)
  
  const [variant, setVariant] = useState<WithMetadata<ProductVariant>>()

  const { data: product } = useQuery({
    queryKey: ProductService.queryKeys.getBySlug(slug, queryParams),
    queryFn: () => productService.getBySlug(slug, queryParams),
    select: (res) => res.data
  })

  useEffect(() => {
    if (product) {
      let defaultVariant = product.attributes.product_variants.data?.find(v => v.attributes.is_default)
      if (!defaultVariant) {
        defaultVariant = product.attributes.product_variants.data?.at(0)
      }
      setVariant(defaultVariant)
    }
  }, [product])

  if (!product) return null

  return (
    <Grid gutter="xl">
      <Grid.Col span={{
        base: 12,
        md: 6
      }}>
        <ProductImages
          productName={product.attributes.name}
          defaultImage={product?.attributes.thumbnail?.data}
          images={product?.attributes.images?.data || []}
        />
      </Grid.Col>
      <Grid.Col span={{
        base: 12,
        md: 6
      }}>
        <ProductDetails product={product} variant={variant} setVariant={setVariant} />
      </Grid.Col>
    </Grid>
  )
}

export default ProductSingle