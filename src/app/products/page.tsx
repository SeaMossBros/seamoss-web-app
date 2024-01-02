import { Container, Grid, GridCol } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import set from 'lodash/set'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ROUTE_PATHS } from '@/consts/route-paths'
import getQueryClient from '@/react-query/getQueryClient'
import ProductService from '@/services/product.service'
import { Product_NoRelations_WithMinPrice } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

import ProductFilters from './ProductFilters'
import ProductList from './ProductList'
import { ProductPageFilter } from './types'

export const metadata: Metadata = {
  title: 'Products | SeaTheMoss',
}

type ProductsPageProps = {
  searchParams: ProductPageFilter & {
    page?: string
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

  const parsedFilters: ProductPageFilter = {}

  Object.entries(plainFilters).forEach(([key, value]) => {
    let val = value
    if (key === 'price_from' || key === 'price_to') val = parseFloat(value as unknown as string)
    if (key === 'rating') val = parseInt(value as unknown as string)
    set(parsedFilters, key, val)
  })

  const filters: QueryParams<Product_NoRelations_WithMinPrice>['filters'] = {}

  if (parsedFilters.category) {
    filters.category = {
      $in: parsedFilters.category,
    }
  }

  if (parsedFilters.price_from || parsedFilters.price_to) {
    const anyFilters = filters as any
    anyFilters.product_variants = anyFilters.product_variants ?? {}
    anyFilters.product_variants.unit_price = {}
    if (parsedFilters.price_from) {
      anyFilters.product_variants.unit_price.$gte = parsedFilters.price_from
    }
    if (parsedFilters.price_to) {
      anyFilters.product_variants.unit_price.$lte = parsedFilters.price_to
    }
  }

  if (parsedFilters.rating) {
    filters.rating = {
      $gte: parsedFilters.rating,
    }
  }

  const params: QueryParams<Product_NoRelations_WithMinPrice> = {
    populate: ['images', 'thumbnail', 'product_variants'],
    pagination: {
      page,
      pageSize: LIMIT,
    },
    filters,
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
            <ProductFilters filters={parsedFilters} />
          </GridCol>
          <GridCol
            span={{
              base: 12,
              md: 9,
            }}
          >
            <ProductList queryParams={params} onPage='Products'/>
          </GridCol>
        </Grid>
      </Container>
    </HydrationBoundary>
  )
}

export default ProductsPage
