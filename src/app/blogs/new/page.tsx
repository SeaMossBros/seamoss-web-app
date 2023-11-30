'use client'

import { Container } from '@mantine/core'

import ArticleContent from '@/components/ArticleContent'

const CreateBlogPostPage: React.FC = () => {
  return (
    <Container>
      <ArticleContent mode="form" />
    </Container>
  )
}

export default CreateBlogPostPage
