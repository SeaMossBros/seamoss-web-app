'use client'

import { Box, Image } from '@mantine/core'
import { useMemo } from 'react'

import { useAboutUsPage } from '@/queries/useAboutUsPage'
import { getStrapiUploadUrl } from '@/utils/cms'

const AboutUsImage: React.FC<{ number: number }> = ({ number }) => {
  const { data } = useAboutUsPage()

  const images = useMemo(() => {
    return data?.attributes.hero_images?.data ?? []
  }, [data?.attributes.hero_images?.data])

  console.log('images', images)
  if (!images[number]?.attributes?.url) return

  return (
    <Box>
      <Image
        src={getStrapiUploadUrl(images[number].attributes.url)}
        alt={images[number].attributes.alternativeText ?? ''}
        width={'100%'}
        mah={420}
        mb={30}
        fit="contain"
        loading="eager"
      />
    </Box>
  )
}

export default AboutUsImage
