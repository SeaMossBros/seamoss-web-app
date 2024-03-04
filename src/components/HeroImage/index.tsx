'use client'

import { Carousel } from '@mantine/carousel'
import { Box, Button, Image, Text, Title, useMantineTheme } from '@mantine/core'
import Autoplay from 'embla-carousel-autoplay'
import Link from 'next/link'
import { useMemo, useRef, useState } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useHomePage } from '@/queries/useHomePage'
import { getStrapiUploadUrl } from '@/utils/cms'

import {
  actionButtons,
  container,
  content,
  description,
  heroButtonContainer,
  inner,
  root,
  slideImage,
  title,
} from './HeroImage.css'

const HeroImage: React.FC = () => {
  const { colors, defaultRadius } = useMantineTheme()
  const [isHovering, setIsHovering] = useState(false)

  const { data } = useHomePage()

  const images = useMemo(() => {
    return data?.attributes.hero_images?.data ?? []
  }, [data?.attributes.hero_images?.data])

  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: false }),
  )

  const resetAutoplay = () => {
    if (autoplay.current) {
      autoplay.current.stop() // Stop current autoplay
      autoplay.current.play() // Start autoplay again
    }
  }

  return (
    <Box
      className={root}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Carousel
        className={container}
        height={560}
        withControls={isHovering}
        withIndicators={true}
        plugins={[autoplay.current]}
        onSlideChange={resetAutoplay}
        controlSize={42}
        speed={6}
        loop
      >
        {images.map((image) => (
          <Carousel.Slide key={image.id}>
            <Image
              className={slideImage}
              src={getStrapiUploadUrl(image.attributes.url)}
              alt={image.attributes.alternativeText ?? ''}
              width={1512}
              height={560}
              fit="cover"
              loading="eager"
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <Box className={inner}>
        <Box className={content}>
          <Title className={title}>
            Explore Earth&apos;s Oceanic Wonders with{' '}
            <Text component="span" inherit variant="gradient">
              SeaTheMoss
            </Text>{' '}
            Products
          </Title>

          <Text
            className={description}
            mt={30}
            py={6}
            style={{
              backgroundColor: colors.white[1],
              textAlign: 'center',
              borderRadius: defaultRadius,
            }}
            c={colors.teal[9]}
          >
            Discover our pure sea moss in gel, dried, and gummy form
            <br />
            Grown in the clean ocean waters of Belize
          </Text>

          <Box className={heroButtonContainer}>
            <Button
              component={Link}
              href={ROUTE_PATHS.PRODUCT.INDEX}
              className={actionButtons}
              mt={40}
              size="md"
            >
              Shop Products
            </Button>
            <Button
              component={Link}
              href={ROUTE_PATHS.ABOUT}
              variant="outline"
              className={actionButtons}
              mt={40}
              size="md"
              c={'#f5f5f5'}
              style={{ borderColor: '#f5f5f5' }}
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
