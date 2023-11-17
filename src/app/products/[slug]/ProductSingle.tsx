'use client'

import { Button, Grid, Stack } from '@mantine/core'
import { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'

import ProductDetails from '@/components/ProductDetails'
import ProductImages from '@/components/ProductImages'
import { useCart } from '@/hooks/useCart'
import useProductForm from '@/hooks/useProductForm'
import { Product } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'
import { QueryParams } from '@/types/QueryParams'

export type ProductSingleProps = {
  slug: string
  queryParams: QueryParams<Product>
}

const ProductSingle: React.FC<ProductSingleProps> = ({ slug, queryParams }) => {
  const { addToCart, isAddingToCart } = useCart()
  const { product, methods } = useProductForm(slug, queryParams)

  const onSubmit = useCallback(
    (data: ProductSelectionFormData) => {
      addToCart(data)
    },
    [addToCart],
  )

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
              <Button type="submit" loading={isAddingToCart} fullWidth>
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
