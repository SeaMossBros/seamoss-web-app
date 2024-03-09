'use client'

import { Box, Flex, Image, ScrollArea, Stack, useMantineTheme } from '@mantine/core'
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
  const { colors, defaultRadius } = useMantineTheme()
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
        src={getStrapiUploadUrl(currentImage.attributes.url)}
        alt={currentImage.attributes.alternativeText || productName}
        width={'auto'}
        maw={1000}
        height={'42vh'}
        mah={'42vh'}
        fit="contain"
        loading="eager"
      />
      <ScrollArea maw="100%" mx={0} px={0}>
        <Flex gap="md">
          {images.map((image) => {
            return (
              <Box
                key={image.id}
                w={100}
                className={previewImage}
                onClick={onSelectImage.bind(image)}
                data-active={currentImage.id === image.id}
                style={{
                  borderColor: currentImage.id === image.id ? colors.teal[9] : 'lightgray',
                  opacity: (currentImage.id !== image.id && 0.72) || 1,
                  borderRadius: defaultRadius,
                }}
              >
                <Image
                  src={getStrapiUploadUrl(
                    image.attributes.formats?.small?.url ?? image.attributes.url,
                  )}
                  alt={image.attributes.alternativeText || productName}
                  width={100}
                  height={100}
                  radius={Number(defaultRadius) - 2}
                />
              </Box>
            )
          })}
        </Flex>
      </ScrollArea>
    </Stack>
  )
}

export default ProductImages
