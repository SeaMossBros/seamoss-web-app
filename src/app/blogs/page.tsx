import './BlogsPage.css'

import { Container, Grid, GridCol } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

import BlogsList from '@/components/Blog/BlogsList'
import getQueryClient from '@/react-query/getQueryClient'
import BlogService from '@/services/blog.service'
import { Blog } from '@/types/Blog'
import { QueryParams } from '@/types/QueryParams'

const BlogsPage: React.FC = async () => {
  const queryClient = getQueryClient()
  const blogService = new BlogService()

  const params: QueryParams<Blog> = {
    populate: ['mainImage', 'main_image_preview'],
  }

  await queryClient.prefetchQuery({
    queryKey: BlogService.queryKeys.list(params),
    queryFn: () => blogService.list(params),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container>
        <Grid>
          <GridCol span={12}>
            <BlogsList queryParams={params} />
          </GridCol>
        </Grid>
      </Container>
    </HydrationBoundary>
  )
}

export default BlogsPage
