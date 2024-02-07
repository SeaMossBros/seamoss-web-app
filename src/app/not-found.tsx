'use client';

import { Button, Container, Image, SimpleGrid, Text, Title } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

import TextLink from '../components/TextLink'
import {
  notFoundControl,
  notFoundDescription,
  notFoundRoot,
  notFoundTitle,
  notFoundVideo,
} from './not-found.css'

const NotFoundImage = () => {
  return (
    <Container className={notFoundRoot}>
      <SimpleGrid spacing={{ base: 40, sm: 80 }} cols={{ base: 1, sm: 2 }}>
        <div>
          <Title c="gray" className={notFoundTitle}>
            Something is not right...
          </Title>
          <Text className={notFoundDescription} c="dimmed" size="lg">
            The page you are trying to open does not exist. Please try another URL. If you think
            this is an error please{' '}
            <TextLink
              textToShow={'contact support'}
              url={'/support'}
              size="lg"
              highlight={true}
              underline={true}
            />
            .
          </Text>
          <Link href="/">
            <Button variant="outline" size="md" mt="xl" className={notFoundControl}>
              Go to home page
            </Button>
          </Link>
          <Link href="/products">
            <Button size="md" mt="xl" className={notFoundControl}>
              Go to products page
            </Button>
          </Link>
        </div>
        <Image
          src={'/videos/SeaTheMoss-Spinner-With-Wildcrafted-Raw-Extended.mp4'}
          className={notFoundVideo}
          onError={(e) => e.currentTarget.src ='/images/SeaTheMoss-StillSpinner.png'}
          alt="animated logo spinning"
        />
      </SimpleGrid>
    </Container>
  )
}

export default NotFoundImage
