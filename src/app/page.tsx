import { Text } from '@mantine/core'
// import getQueryClient from '@/react-query/getQueryClient'
// import ProductService from '@/services/product.service'
// import SingleTypeService from '@/services/single-type.service'
// import { Product_NoRelations_WithMinPrice } from '@/types/Product'
// import { QueryParams } from '@/types/QueryParams'
// import HeroImage from '../components/HeroImage'
// import { productsWrapper } from './page.css'
// import ProductList from './products/ProductList'
import Image from 'next/image'
// import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

const HomePage: React.FC = async () => {
  // const queryClient = getQueryClient()
  // const singleTypeService = new SingleTypeService()
  // const productService = new ProductService()

  // const params: QueryParams<Product_NoRelations_WithMinPrice> = {
  //   populate: ['images', 'thumbnail', 'product_variants', 'product_herbs', 'product_sweeteners', 'product_fruits', 'product_options'],
  //   pagination: {
  //     page: 1,
  //     pageSize: 4,
  //   },
  // }

  // await queryClient.prefetchQuery({
  //   queryKey: ProductService.queryKeys.list(params),
  //   queryFn: () => productService.list(params),
  //   gcTime: 5 * 60 * 1000,
  // })

  // await queryClient.prefetchQuery({
  //   queryKey: SingleTypeService.queryKeys.getHomePageData(),
  //   queryFn: () => singleTypeService.getHomePageData(),
  // })

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    //   <Stack>
    //     <HeroImage />
    //     <div className={productsWrapper}>
    //       <ProductList queryParams={params} onPage={'Home'} />
    //     </div>
    //   </Stack>
    // </HydrationBoundary>
    <div
      style={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        userSelect: 'none',
        overflowY: 'auto',
        padding: '30px',
      }}
    >
      <Image
        width={210}
        height={90}
        src={'/images/SeaTheMoss-StillSpinner.svg'}
        alt="under construction app logo"
      />
      <Text style={{ fontSize: '30px' }}>SeaTheMoss.com is Under Construction</Text>
      <br />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <h3>Orders can still be placed by texting this number: </h3>
        <a
          href="tel:+12402735088"
          style={{ margin: '3px', padding: '0', fontSize: '18px', fontFamily: 'Palantino' }}
        >
          +1 (240) 273-5088
        </a>
        <br />
        <Text fz={'lg'} fw={600}>
          Current Products:
        </Text>
        <ul style={{ userSelect: 'text', marginTop: '6px' }}>
          <li>Sea Moss Gel</li>
          <p style={{ marginLeft: '12px' }}>- choose quantity (comes in 32oz mason jars)</p>
          <p style={{ marginLeft: '12px' }}>
            - choose up 3 fruits (Pineapple, Apple, Blueberry, Lemon)
          </p>
          <p style={{ marginLeft: '12px' }}>- choose up 3 herbs (Mint, Basil, Cilantro)</p>
          <p style={{ marginLeft: '12px' }}>
            - choose 1 sweentener or say unsweetened. (Maple Syrup, Honey, Monkfruit Sweetener)
          </p>
          <li style={{ marginTop: '6px' }}>Dried Sea Moss (2oz, 4oz, 8oz, 1lb, 2lb)</li>
        </ul>
      </div>
      <br />
      <p>
        Thank you for your patience! If you’ve ordered from us before, we sincerely appreciate your
        support and are glad you enjoyed the Sea Moss!
      </p>
      <br />
      <p>
        Estimated down time is no more than 1 month. Please check back on November 1st for updates!
      </p>
      <br />
      <p>Thank You,</p>
      <p>SeaTheMoss Team {':)'}</p>
    </div>
  )
}

export default HomePage
