import { Container, Grid, GridCol } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { headers } from 'next/headers'
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

  const headerList = headers()
  const isAuthenticated = (() => {
    const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':')

    const authheader = headerList.get('authorization') || headerList.get('Authorization')

    if (!authheader) {
      return false
    }

    const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':')
    const user = auth[0]
    const pass = auth[1]

    if (user == AUTH_USER && pass == AUTH_PASS) {
      return true
    } else {
      return false
    }
  })()

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
            <ArticleSingle
              isAuthenticated={isAuthenticated}
              slug={params.slug}
              queryParams={query}
            />
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
