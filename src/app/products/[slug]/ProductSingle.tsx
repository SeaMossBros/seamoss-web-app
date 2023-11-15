'use client'

import { Button, Grid, Stack } from '@mantine/core'
import { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'

import ProductDetails from '@/components/ProductDetails'
import ProductImages from '@/components/ProductImages'
import useProductForm from '@/hooks/useProductForm'
import { Product } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'
import { QueryParams } from '@/types/QueryParams'

export type ProductSingleProps = {
  slug: string
  queryParams: QueryParams<Product>
}

const ProductSingle: React.FC<ProductSingleProps> = ({ slug, queryParams }) => {
  const { product, methods } = useProductForm(slug, queryParams)

  const onSubmit = useCallback((data: ProductSelectionFormData) => {
    console.log({
      data,
    })
  }, [])

  if (!product) return null

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
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
            <Stack gap="lg">
              <ProductDetails product={product} />
              <Button type="submit" fullWidth>
                ADD TO CART
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default ProductSingle
