import { Stack } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

import getQueryClient from '@/react-query/getQueryClient'
import SingleTypeService from '@/services/single-type.service'

import HeroImage from '../components/HeroImage'

const HomePage: React.FC = async () => {
  const queryClient = getQueryClient()
  const singleTypeService = new SingleTypeService()

  await queryClient.prefetchQuery({
    queryKey: SingleTypeService.queryKeys.getHomePageData(),
    queryFn: () => singleTypeService.getHomePageData(),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack>
        <HeroImage />
        <div>Products</div>
      </Stack>
    </HydrationBoundary>
  )
}

export default HomePage
