import { Button, Text, Title } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

import {
  content,
  control,
  description,
  heroButtonContainer,
  inner,
  root,
  title,
} from './HeroImage.css'

const HeroImage = () => {
  return (
    <div className={root}>
      <div className={inner}>
        <div className={content}>
          <Title className={title}>
            Explore Earth&apos;s Oceanic Wonders with{' '}
            <Text
              component="span"
              inherit
              variant="gradient"
              gradient={{ from: 'blue', to: 'orange' }}
            >
              Sea The Moss
            </Text>{' '}
            Products
          </Title>

          <Text className={description} mt={30}>
            Discover our pure sea moss in gel, dried, and gummy form
            <br />
            Grown in the clean ocean waters of Belize
          </Text>

          <div className={heroButtonContainer}>
            <Link href="/products">
              <Button className={control} mt={40} size="md">
                Shop Products
              </Button>
            </Link>
            <Link href="/about-us">
              <Button variant="outline" className={control} mt={40} size="md">
                Why Our Sea Moss?
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroImage
