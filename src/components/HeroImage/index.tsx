'use client'

import { Carousel } from '@mantine/carousel'
import { Box, Button, Image, Text, Title } from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import NextImage from 'next/image'
import Link from 'next/link'
import { useMemo, useRef } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useHomePage } from '@/queries/useHomePage'
import { getStrapiUploadUrl } from '@/utils/cms'

import {
  carouselRoot,
  content,
  control,
  description,
  heroButtonContainer,
  inner,
  root,
  slideImage,
  title,
} from './HeroImage.css'

const HeroImage: React.FC = () => {
  const autoplay = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false }),
  )
  const { data } = useHomePage()

  const images = useMemo(() => {
    return data?.attributes.hero_images?.data ?? []
  }, [data?.attributes.hero_images?.data])

  return (
    <Box className={root}>
      <Carousel
        className={carouselRoot}
        height={560}
        withControls={false}
        plugins={[autoplay.current]}
        speed={20}
        loop
      >
        {images.map((image) => (
          <Carousel.Slide key={image.id}>
            <Image
              component={NextImage}
              className={slideImage}
              src={getStrapiUploadUrl(image.attributes.url)}
              alt={image.attributes.alternativeText ?? ''}
              width={1512}
              height={560}
              fit="cover"
              loading="eager"
              priority
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Box className={inner}>
        <Box className={content}>
          <Title className={title}>
            Explore Earth&apos;s Oceanic Wonders with{' '}
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: 'blue', to: 'orange' }}
            >
              SeaTheMoss
            </Text>{' '}
            Products
          </Title>

          <Text className={description} mt={30}>
            Discover our pure sea moss in gel, dried, and gummy form
            <br />
            Grown in the clean ocean waters of Belize
          </Text>

          <Box className={heroButtonContainer}>
            <Button
              component={Link}
              href={ROUTE_PATHS.PRODUCT.INDEX}
              className={control}
              mt={40}
              size="md"
            >
              Shop Products
            </Button>
            <Button
              component={Link}
              href={ROUTE_PATHS.ABOUT}
              variant="outline"
              className={control}
              mt={40}
              size="md"
            >
              Why Our Sea Moss?
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default HeroImage
