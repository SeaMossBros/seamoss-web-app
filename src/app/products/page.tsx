import { Container, Grid, GridCol } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import React from 'react'

import getQueryClient from '@/react-query/getQueryClient'
import ProductService from '@/services/product.service'
import { Product_Plain } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

import ProductList from './ProductList'

export const metadata: Metadata = {
  title: 'Products | SeaTheMoss',
}

// TODO: Add pagination
const ProductsPage: React.FC = async () => {
  const queryClient = getQueryClient()
  const productService = new ProductService()

  const params: QueryParams<Product_Plain> = {
    populate: ['images', 'thumbnail', 'product_variants'],
  }

  await queryClient.prefetchQuery({
    queryKey: ProductService.queryKeys.list(params),
    queryFn: () => productService.list(params),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container>
        <Grid>
          <GridCol
            span={{
              base: 12,
              md: 3,
            }}
          ></GridCol>
          <GridCol
            span={{
              base: 12,
              md: 9,
            }}
          >
            <ProductList queryParams={params} />
          </GridCol>
        </Grid>
      </Container>
    </HydrationBoundary>
  )
}

export default ProductsPage
