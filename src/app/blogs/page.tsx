import { Button, Container, Group, Text, useMantineColorScheme } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import getQueryClient from '@/react-query/getQueryClient'
import BlogService from '@/services/blog.service'
import { Article_Plain } from '@/types/Article'
import { QueryParams } from '@/types/QueryParams'
import {title} from './BlogsPage.css'

import BlogsList from './BlogsList'
import { AuthUser } from '@/types/Auth'
import { getSessionFromCookies } from '@/lib/crypt'

export const metadata: Metadata = {
  title: 'Blogs | Sea the Moss',
}

const BlogsPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies();
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

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container display={'flex'} style={{flexDirection: 'column', alignItems: 'center'}}>
        <Text className={title}>Blogs</Text>
        {user && user.id && user.role?.type === 'admin' ? (
          <Group justify="flex-end" mb={60}>
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
