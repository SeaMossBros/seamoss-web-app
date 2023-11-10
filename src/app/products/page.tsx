import { Container, Grid, GridCol } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

import getQueryClient from '@/react-query/getQueryClient'
import ProductService from '@/services/product.service'
import { Product } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

import ProductList from './ProductList'

const ProductsPage: React.FC = async () => {
  const queryClient = getQueryClient()
  const productService = new ProductService()

  const params: QueryParams<Product> = {
    populate: ['images']
  }

  await queryClient.prefetchQuery({
    queryKey: ProductService.queryKeys.list(params),
    queryFn: () => productService.list(params),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container>
        <Grid>
          <GridCol span={{
            base: 12,
            sm: 3
          }}>

          </GridCol>
          <GridCol span={{
            base: 12,
            sm: 9
          }}>
            <ProductList />
          </GridCol>
        </Grid>
      </Container>
    </HydrationBoundary>
  )
}

export default ProductsPage
