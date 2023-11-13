'use client'

import { Grid } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import ProductDetails from '@/components/ProductDetails'
import ProductImages from '@/components/ProductImages'
import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'
import { Product } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'
import { QueryParams } from '@/types/QueryParams'

export type ProductSingleProps = {
  slug: string
  queryParams: QueryParams<Product>
}

const ProductSingle: React.FC<ProductSingleProps> = ({ slug, queryParams }) => {
  const productService = useService(ProductService)

  const methods = useForm<ProductSelectionFormData>()

  const { data: product } = useQuery({
    queryKey: ProductService.queryKeys.getBySlug(slug, queryParams),
    queryFn: () => productService.getBySlug(slug, queryParams),
    select: (res) => res.data,
  })

  useEffect(() => {
    if (product) {
      let defaultVariant = product.attributes.product_variants?.data?.find(
        (v) => v.attributes.is_default,
      )
      if (!defaultVariant) {
        defaultVariant = product.attributes.product_variants?.data?.at(0)
      }
      if (defaultVariant) {
        methods.setValue('variant', {
          ...defaultVariant,
          quantity: 1,
        })
      }
    }
  }, [methods, product])

  if (!product) return null

  return (
    <FormProvider {...methods}>
      <Grid gutter="xl">
        <Grid.Col
          span={{
            base: 12,
            md: 6,
          }}
        >
          <ProductImages
            productName={product.attributes.name}
            defaultImage={product?.attributes.thumbnail?.data}
            images={product?.attributes.images?.data || []}
          />
        </Grid.Col>
        <Grid.Col
          span={{
            base: 12,
            md: 6,
          }}
        >
          <ProductDetails product={product} />
        </Grid.Col>
      </Grid>
    </FormProvider>
  )
}

export default ProductSingle
