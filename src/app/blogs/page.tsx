import { Button, Container, Group } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import { headers } from 'next/headers'
import Link from 'next/link'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import getQueryClient from '@/react-query/getQueryClient'
import BlogService from '@/services/blog.service'
import { Article_Plain } from '@/types/Article'
import { QueryParams } from '@/types/QueryParams'

import BlogsList from './BlogsList'

export const metadata: Metadata = {
  title: 'Blogs | Sea the Moss',
}

const BlogsPage: React.FC = async () => {
  const queryClient = getQueryClient()
  const blogService = new BlogService()

  const params: QueryParams<Article_Plain> = {
    populate: ['cover'],
    fields: ['title', 'slug', 'introduction', 'publishedAt'],
  }

  await queryClient.prefetchQuery({
    queryKey: BlogService.queryKeys.list(params),
    queryFn: () => blogService.list(params),
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
        {isAuthenticated ? (
          <Group justify="flex-end">
            <Button component={Link} href={ROUTE_PATHS.BLOG.CREATE}>
              Create new article
            </Button>
          </Group>
        ) : null}
        <BlogsList queryParams={params} />
      </Container>
    </HydrationBoundary>
  )
}

export default BlogsPage
