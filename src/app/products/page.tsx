import { Container, Grid, GridCol } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import set from 'lodash/set'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ROUTE_PATHS } from '@/consts/route-paths'
import getQueryClient from '@/react-query/getQueryClient'
import ProductService from '@/services/product.service'
import { Product_NoRelations } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

import ProductFilters from './ProductFilters'
import ProductList from './ProductList'

export const metadata: Metadata = {
  title: 'Products | SeaTheMoss',
}

type ProductsPageProps = {
  searchParams: {
    page?: string
    filters?: QueryParams<Product_NoRelations>['filters']
  }
}

const LIMIT = 12

const ProductsPage: React.FC<ProductsPageProps> = async ({ searchParams }) => {
  const queryClient = getQueryClient()
  const productService = new ProductService()

  const { page: plainPage, ...plainFilters } = searchParams

  const page = parseInt(plainPage || '1') // default to page 1

  if (isNaN(page) || page < 1) {
    redirect(ROUTE_PATHS.PRODUCT.INDEX)
  }

  const parsedFilters: {
    filters?: QueryParams<Product_NoRelations>['filters']
  } = {}

  Object.entries(plainFilters ?? {}).forEach(([key, value]) => {
    set(parsedFilters, key, value)
  })

  const params: QueryParams<Product_NoRelations> = {
    populate: ['images', 'thumbnail', 'product_variants'],
    pagination: {
      page,
      pageSize: LIMIT,
    },
    filters: parsedFilters.filters,
  }

  await queryClient.prefetchQuery({
    queryKey: ProductService.queryKeys.list(params),
    queryFn: () => productService.list(params),
    gcTime: 5 * 60 * 1000,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container>
        <Grid gutter="xl">
          <GridCol
            span={{
              base: 12,
              md: 3,
            }}
          >
            <ProductFilters filters={params.filters} />
          </GridCol>
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
