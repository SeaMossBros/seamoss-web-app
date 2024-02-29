'use client'

import { Container, Grid } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import ArticleContent from '@/components/ArticleContent'
import { ROUTE_PATHS } from '@/consts/route-paths'
import { Article } from '@/types/Article'

const CreateBlogPostPage: React.FC = () => {
  const router = useRouter()

  const onSaved = useCallback(
    (data: Article) => {
      const {
        attributes: { slug },
      } = data
      if (!slug) return
      router.push(ROUTE_PATHS.BLOG.SINGULAR.replaceAll('{slug}', slug))
    },
    [router],
  )

  return (
    <Container>
      <Grid>
        <Grid.Col
          span={{
            base: 12,
            md: 9,
          }}
        >
          <ArticleContent mode="form" onSaved={onSaved} />
        </Grid.Col>
        <Grid.Col
          visibleFrom="md"
          span={{
            md: 3,
          }}
        ></Grid.Col>
      </Grid>
    </Container>
  )
}

export default CreateBlogPostPage
