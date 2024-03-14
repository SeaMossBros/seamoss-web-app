import { Container } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getSessionFromCookies } from '@/lib/crypt'
import getQueryClient from '@/react-query/getQueryClient'
import ProductService from '@/services/product.service'
import { AuthUser } from '@/types/Auth'
import { Product_Plain } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

import ProductSingle from './ProductSingle'

type Props = {
  params: { slug: string }
}

export const generateMetadata = async ({ params: { slug } }: Props): Promise<Metadata> => {
  // const productService = new ProductService()

  // console.log(`Fetching product by slug: ${slug}...`);

  // const product = await productService.getBySlug(slug)

  return {
    title: `${slug.replaceAll('-', ' ')} | Product | SeaTheMoss`,
    // description: product.data?.attributes.description,
  }
}

const ProductDetailPage: React.FC<Props> = async ({ params }: Props) => {
  if (!params.slug) {
    notFound()
  }
  const user: AuthUser | null = await getSessionFromCookies()

  const queryClient = getQueryClient()
  const productService = new ProductService()

  const queryParams: QueryParams<Product_Plain> = {
    populate: {
      images: true,
      videos: true,
      thumbnail: true,
      product_variants: {
        populate: ['image'],
      },
      product_properties: {
        populate: ['image'],
      },
      purchase_options: true,
    },
  }

  await queryClient.prefetchQuery({
    queryKey: ProductService.queryKeys.getBySlug(params.slug, queryParams),
    queryFn: () => productService.getBySlug(params.slug, queryParams),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container mt={90}>
        <ProductSingle slug={params.slug} queryParams={queryParams} user={user} />
      </Container>
    </HydrationBoundary>
  )
}

export default ProductDetailPage
