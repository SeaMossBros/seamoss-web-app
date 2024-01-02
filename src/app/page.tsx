import { Stack } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

import getQueryClient from '@/react-query/getQueryClient'
import SingleTypeService from '@/services/single-type.service'

import HeroImage from '../components/HeroImage'
import ProductList from './products/ProductList'
import { QueryParams } from '@/types/QueryParams'
import { Product_NoRelations_WithMinPrice } from '@/types/Product'
import ProductService from '@/services/product.service'
import { productsWrapper } from './page.css'

const HomePage: React.FC = async () => {
  const queryClient = getQueryClient();
  const singleTypeService = new SingleTypeService();
  const productService = new ProductService();

  const params: QueryParams<Product_NoRelations_WithMinPrice> = {
    populate: ['images', 'thumbnail', 'product_variants'],
    pagination: {
      page: 1,
      pageSize: 2,
    }
  }

  await queryClient.prefetchQuery({
    queryKey: ProductService.queryKeys.list(params),
    queryFn: () => productService.list(params),
    gcTime: 5 * 60 * 1000,
  })

  await queryClient.prefetchQuery({
    queryKey: SingleTypeService.queryKeys.getHomePageData(),
    queryFn: () => singleTypeService.getHomePageData(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack>
        <HeroImage />
        <div className={productsWrapper}>
          <ProductList queryParams={params} onPage={'Home'} /> 
        </div>
      </Stack>
    </HydrationBoundary>
  )
}

export default HomePage
