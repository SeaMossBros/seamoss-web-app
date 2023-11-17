import { Container, Grid, GridCol } from '@mantine/core'
import React from 'react'

import BlogsList from '@/components/Blog/BlogsList'

const BlogsPage: React.FC = () => {
  return (
    <Container>
      <Grid>
        <GridCol span={12}>
          <BlogsList />
        </GridCol>
      </Grid>
    </Container>
  )
}

export default BlogsPage