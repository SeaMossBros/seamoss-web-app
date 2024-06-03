'use client'

import './magnify-image.css'

import {
  Box,
  Flex,
  Image,
  ScrollArea,
  Stack,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { MouseEvent, useCallback, useState } from 'react'

import { Media } from '@/types/Media'
import { getStrapiUploadUrl } from '@/utils/cms'

import { imagesCont, previewImage } from './ProductImages.css'

export type ProductImagesProps = {
  productName: string
  defaultImage?: Media | null
  images: Array<Media>
}

const ProductImages: React.FC<ProductImagesProps> = ({ defaultImage, images, productName }) => {
  // Initialize variables to track the previous mouse position
  const { colors, defaultRadius } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const getMagnifyingGlassLogo = () =>
    isDarkTheme ? '/images/magnify-icon-30-white.png' : '/images/magnify-icon-30-black.png'
  const [currentImage, setCurrentImage] = useState<Media>(defaultImage ?? images[0])
  const [shouldMagnify, setShouldMagnify] = useState(false)

  const update = useCallback(function updateImpl(e: MouseEvent) {
    const { clientX, clientY } = e
    const inner = document.getElementsByClassName('magnify-overlay')[0] as HTMLElement

    const container = inner.parentElement?.parentElement
    if (container) {
      const rect = container.getBoundingClientRect()
      const xPercent = ((clientX - rect.left) / rect.width) * 100
      const yPercent = ((clientY - rect.top) / rect.height) * 100

      // Move the background image to reflect the cursor position
      inner.style.backgroundPosition = `${xPercent}% ${yPercent}%`
    }
  }, [])

  const onMouseLeaveHandler = () => {
    if (!shouldMagnify) return
    handleShouldMagnify(null)
    const inner = document.getElementsByClassName('magnify-overlay')[0] as HTMLElement
    inner.style.transform = 'scale(1) translate(0px, 0px)'
  }

  const onMouseMoveHandler = (event: MouseEvent<HTMLDivElement>) => {
    if (!shouldMagnify) return

    const imgCont = document.getElementsByClassName('image-container')[0] as HTMLElement
    const magnifyOverlayCont = document.getElementsByClassName(
      'magnify-overlay-cont',
    )[0] as HTMLElement
    if (magnifyOverlayCont.style.display !== 'block') {
      magnifyOverlayCont.style.display = 'block'
      imgCont.style.cursor = 'url(/images/magnify-icon-30-teal.png), auto'
    }

    if (isTimeToUpdate()) {
      update(event as unknown as MouseEvent) // Handle mouse move
    }
  }

  // Time-based update control (adjust the interval as needed)
  let lastUpdateTime = Date.now()
  const updateInterval = 60 // only update every 120 milliseconds

  function isTimeToUpdate() {
    const currentTime = Date.now()
    const timeElapsed = currentTime - lastUpdateTime

    if (timeElapsed > updateInterval) {
      lastUpdateTime = currentTime
      return true
    }

    return false
  }

  const handleShouldMagnify = (e: any | null) => {
    if (isTouchDevice()) {
      const link = document.createElement('a')
      link.href = getStrapiUploadUrl(currentImage.attributes.url)
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }

    setShouldMagnify((prev) => {
      if (prev) {
        if (e) e.target.src = getMagnifyingGlassLogo()
        const magnifyOverlayCont = document.getElementsByClassName(
          'magnify-overlay-cont',
        )[0] as HTMLElement
        magnifyOverlayCont.style.display = 'none'
        const imgCont = document.getElementsByClassName('image-container')[0] as HTMLElement
        imgCont.style.cursor = 'auto'
      } else {
        const inner = document.getElementsByClassName('magnify-overlay')[0] as HTMLElement
        inner.style.transform = 'scale(1.44) translate(0px, 0px)'
        if (e) e.target.src = '/images/magnify-icon-30-teal.png'
      }

      return !prev
    })
  }

  const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0
  }

  const onSelectImage = useCallback(function onSelectImageImpl(this: Media, e: MouseEvent) {
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
    <Stack className={imagesCont}>
      <div
        className="image-container"
        onMouseLeave={onMouseLeaveHandler}
        onMouseMove={onMouseMoveHandler}
      >
        <img
          src={getStrapiUploadUrl(currentImage.attributes.url)}
          alt={currentImage.attributes.alternativeText || productName}
          className="default-image"
        />
        <div className="magnify-overlay-cont">
          <div
            className="magnify-overlay"
            style={{ backgroundImage: `url(${getStrapiUploadUrl(currentImage.attributes.url)})` }}
          ></div>
        </div>
      </div>
      <img
        src={
          shouldMagnify && !isTouchDevice()
            ? '/images/magnify-icon-30-teal.png'
            : getMagnifyingGlassLogo()
        }
        onClick={handleShouldMagnify}
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
