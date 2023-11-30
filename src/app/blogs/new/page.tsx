'use client'

import { Container, Grid } from '@mantine/core'

import ArticleContent from '@/components/ArticleContent'

const CreateBlogPostPage: React.FC = () => {
  return (
    <Container>
      <Grid>
        <Grid.Col
          span={{
            base: 12,
            md: 9,
          }}
        >
          <ArticleContent mode="form" />
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
