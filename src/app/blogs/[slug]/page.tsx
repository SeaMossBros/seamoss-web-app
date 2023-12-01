import { Container, Grid, GridCol } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'

import getQueryClient from '@/react-query/getQueryClient'
import BlogService from '@/services/blog.service'
import { Article_NoRelations } from '@/types/Article'
import { QueryParams } from '@/types/QueryParams'

import ArticleSingle from './ArticleSingle'

type Props = {
  params: { slug: string }
}

export const generateMetadata = async ({ params: { slug } }: Props): Promise<Metadata> => {
  const blogService = new BlogService()

  const article = await blogService.getBySlug(slug)

  return {
    title: `${article.data?.attributes.title ?? slug} | SeaTheMoss`,
    description: article.data?.attributes.introduction,
  }
}

const BlogShowPage: React.FC<Props> = async ({ params }) => {
  if (!params.slug) {
    notFound()
  }

  const queryClient = getQueryClient()
  const blogService = new BlogService()

  const query: QueryParams<Article_NoRelations> = {
    publicationState: 'live',
    populate: '*',
  }

  await queryClient.prefetchQuery({
    queryKey: BlogService.queryKeys.getBySlug(params.slug, query),
    queryFn: () => blogService.getBySlug(params.slug, query),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container>
        <Grid>
          <GridCol
            span={{
              base: 12,
              md: 9,
            }}
          >
            <ArticleSingle slug={params.slug} queryParams={query} />
          </GridCol>
          <GridCol
            visibleFrom="md"
            span={{
              md: 3,
            }}
          ></GridCol>
        </Grid>
      </Container>
    </HydrationBoundary>
  )
}

export default BlogShowPage
