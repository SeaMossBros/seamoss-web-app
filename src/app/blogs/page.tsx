import { Button, Container, Flex, Group, Overlay, Text } from '@mantine/core'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { getSessionFromCookies } from '@/lib/crypt'
import getQueryClient from '@/react-query/getQueryClient'
import BlogService from '@/services/blog.service'
import { Article_Plain } from '@/types/Article'
import { AuthUser } from '@/types/Auth'
import { QueryParams } from '@/types/QueryParams'

import BlogsList from './BlogsList'
import { inner, title, wrapper } from './BlogsPage.css'

export const metadata: Metadata = {
  title: 'Blogs | Sea the Moss',
}

const BlogsPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()
  const queryClient = getQueryClient()
  const blogService = new BlogService()

  const params: QueryParams<Article_Plain> = {
    fields: ['title', 'slug', 'introduction', 'createdAt', 'time_to_finish_reading', 'content'],
  }

  await queryClient.prefetchQuery({
    queryKey: BlogService.queryKeys.list(params),
    queryFn: () => blogService.list(params),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={wrapper}>
        <div className={inner}>
          <Overlay color="#1a1b1e" opacity={0.65} zIndex={1} />
        </div>
      </div>
      <Container display={'flex'} style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Group justify="flex-end" mb={60}>
          {user && user.id && user.role?.type === 'admin' ? (
            <Flex w={'100vw'} direction={'column'} align={'center'}>
              <Text className={title}>Blogs</Text>
              <Button component={Link} href={ROUTE_PATHS.BLOG.CREATE} miw={'fit-content'}>
                Create new article
              </Button>
            </Flex>
          ) : (
            <Text className={title}>Blogs</Text>
          )}
        </Group>
        <BlogsList queryParams={params} />
      </Container>
    </HydrationBoundary>
  )
}

export default BlogsPage
