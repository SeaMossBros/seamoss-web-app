import './not-found.css'

import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core'
import Link from 'next/link'
import React from 'react'
import TextLink from '../components/TextLink'

const NotFoundImage = () => {
  return (
    <Container className={'not-found-root'}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <div>
          <Title c="primary-gray" className={'not-found-title'}>
            Something is not right...
          </Title>
          <Text c="dimmed" size="lg">
            The page you are trying to open does not exist. Please try another URL. If you think this is an error please
            {' '}
            <TextLink
              textToShow={'contact support'}
              url={'/support'}
              size="lg"
              highlight={true}
              underline={true}
            />.
          </Text>
          <Link href="/">
            <Button variant="outline" size="md" mt="xl" className={'not-found-control'}>
              Go to home page
            </Button>
          </Link>
          <Link href="/products">
            <Button size="md" mt="xl" className={'not-found-control'}>
              Go to products page
            </Button>
          </Link>
        </div>
        <Image
          src={'/videos/SeaTheMoss-Spinner-With-Wildcrafted-Raw-Extended.mp4'}
          className={'not-found-desktopImage'}
        />
      </SimpleGrid>
    </Container>
  )
}

export default NotFoundImage
