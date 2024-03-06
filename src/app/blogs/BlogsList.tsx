'use client'

import { Grid } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useEffect } from 'react'

import ArticleCard from '@/components/ArticleCard'
import { useArticles } from '@/queries/useArticles'
import { Article_Plain } from '@/types/Article'
import { QueryParams } from '@/types/QueryParams'

export type BlogListProps = {
  queryParams: QueryParams<Article_Plain>
}

const BlogsList: React.FC<BlogListProps> = ({ queryParams }) => {
  const { data: articles } = useArticles(queryParams)

  useEffect(() => {
    if (articles?.error) {
      notifications.show({
        id: 'articles',
        color: 'red',
        message: 'Unexpected error occurred when loading articles',
      })
    }
  }, [articles?.error])

  if (articles?.error) return <div>Error loading articles.</div>

  return (
    <Grid p={15}>
      {articles?.data?.map((article) => (
        <Grid.Col
          key={article.id}
          span={{
            base: 6,
            md: 3,
          }}
        >
          <ArticleCard article={article} />
        </Grid.Col>
      ))}
    </Grid>
  )
}

export default BlogsList
