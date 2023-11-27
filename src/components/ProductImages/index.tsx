'use client'

import { Box, Flex, Image, ScrollArea, Stack } from '@mantine/core'
import { default as NextImage } from 'next/image'
import { useCallback, useState } from 'react'

import { Media } from '@/types/Media'
import { getStrapiUploadUrl } from '@/utils/cms'

import { previewImage } from './ProductImages.css'

export type ProductImagesProps = {
  productName: string
  defaultImage?: Media | null
  images: Array<Media>
}

const ProductImages: React.FC<ProductImagesProps> = ({ defaultImage, images, productName }) => {
  const [currentImage, setCurrentImage] = useState<Media>(defaultImage ?? images[0])

  const onSelectImage = useCallback(function onSelectImageImpl(
    this: Media,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    const target = e.target as HTMLDivElement

    target.scrollIntoView({
      inline: 'center',
      behavior: 'smooth',
      block: 'nearest',
    })

    setCurrentImage(this)
  }, [])

  if (!images.length) return null

  return (
    <Stack>
      <Image
        component={NextImage}
        src={getStrapiUploadUrl(currentImage.attributes.url)}
        alt={currentImage.attributes.alternativeText || productName}
        width={1000}
        height={1000}
        priority
      />
      <ScrollArea maw="100%" mx="auto">
        <Flex gap="md">
          {images.map((image) => (
            <Box
              key={image.id}
              w={100}
              className={previewImage}
              onClick={onSelectImage.bind(image)}
              data-active={currentImage.id === image.id}
            >
              <Image
                component={NextImage}
                src={getStrapiUploadUrl(
                  image.attributes.formats.small?.url ?? image.attributes.url,
                )}
                alt={image.attributes.alternativeText || productName}
                width={100}
                height={100}
              />
            </Box>
          ))}
        </Flex>
      </ScrollArea>
    </Stack>
  )
}

export default ProductImages
