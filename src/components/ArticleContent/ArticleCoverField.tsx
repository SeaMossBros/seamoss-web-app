import { AspectRatio, Image, Input, Overlay, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure, useHover } from '@mantine/hooks'
import classNames from 'classnames'
// import omit from 'lodash/omit'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ArticleFormData } from '@/types/ArticleForm'
// import { Media_Plain } from '@/types/Media'
import { getStrapiUploadUrl } from '@/utils/cms'

// import MediaUploadModal from '../MediaUploadModal'
import { ArticleComponentCommonProps } from './common'
import { coverImageError, coverImageField } from './styles.css'

export type ArticleCoverFieldProps = ArticleComponentCommonProps

const ArticleCoverField: React.FC<ArticleCoverFieldProps> = ({ mode }) => {
  const { defaultRadius } = useMantineTheme()
  // const [darkestColor, setDarkestColor] = useState('')

  const methods = useFormContext<ArticleFormData>()

  const cover = methods.watch('cover')

  const { ref, hovered } = useHover()
  const [_, uploadModal] = useDisclosure()

  const onCoverClick = useCallback(() => {
    if (mode !== 'form') return
    uploadModal.open()
  }, [mode, uploadModal])

  // const onSave = useCallback(
  //   (_type: 'video' | 'image', _media: string | Media_Plain) => {
  //     const media = _media as Media_Plain // we know for sure that user can only upload media by setting uploadMethods={['upload']}
  //     uploadModal.close()
  //     methods.setValue(
  //       'cover',
  //       {
  //         id: media.id,
  //         attributes: omit(media, 'id'),
  //       },
  //       {
  //         shouldValidate: true,
  //         shouldDirty: true,
  //         shouldTouch: true,
  //       },
  //     )
  //   },
  //   [methods, uploadModal],
  // )

  // useEffect(() => {
  //   if (!cover?.attributes.mime.startsWith('image') || !cover?.attributes?.url) return

  //   const image = new window.Image()
  //   image.crossOrigin = 'Anonymous'
  //   image.src = getStrapiUploadUrl(cover.attributes.url)
  //   image.alt = 'cover-img'
  //   image.addEventListener('load', () => {
  //     const canvasElement = document.getElementById('canvas') as HTMLCanvasElement
  //     if (!canvasElement) return

  //     const context = canvasElement.getContext('2d', { willReadFrequently: true })
  //     if (!context) return

  //     canvasElement.width = image.width
  //     canvasElement.height = image.height
  //     context.drawImage(image, 0, 0)

  //     const imageData = context.getImageData(0, 0, canvasElement.width, canvasElement.height)
  //     // let lightest = [0, 0, 0, 0]; // Initialize with a dark color (RGBA)
  //     let darkest = [255, 255, 255, 255] // Initialize with a light color (RGBA)

  //     // Function to calculate the brightness of a color
  //     const calculateBrightness = (r: number, g: number, b: number) =>
  //       0.299 * r + 0.587 * g + 0.114 * b

  //     // Function to check if color is not too close to black or white
  //     const isSignificantColor = (r: number, g: number, b: number, a: number) => {
  //       // Avoid nearly transparent pixels
  //       if (a < 200) return false // Adjust opacity threshold as needed

  //       const brightness = calculateBrightness(r, g, b)
  //       // Avoid blackish and whiteish by checking brightness thresholds
  //       return brightness > 40 && brightness < 215
  //     }

  //     for (let i = 0; i < imageData.data.length; i += 4) {
  //       const r = imageData.data[i]
  //       const g = imageData.data[i + 1]
  //       const b = imageData.data[i + 2]
  //       const a = imageData.data[i + 3]

  //       // Use the significant color check
  //       if (!isSignificantColor(r, g, b, a)) continue

  //       const brightness = calculateBrightness(r, g, b)
  //       // const lightestBrightness = calculateBrightness(lightest[0], lightest[1], lightest[2]);
  //       const darkestBrightness = calculateBrightness(darkest[0], darkest[1], darkest[2])

  //       // if (brightness > lightestBrightness) {
  //       //   lightest = [r, g, b, a];
  //       // }
  //       if (brightness < darkestBrightness) {
  //         darkest = [r, g, b, a]
  //       }
  //     }

  //     // const lightestColor = `rgba(${lightest[0]}, ${lightest[1]}, ${lightest[2]}, ${(lightest[3] / 255).toFixed(2)})`;
  //     const darkestColor = `rgba(${darkest[0]}, ${darkest[1]}, ${darkest[2]}, ${(
  //       darkest[3] / 255
  //     ).toFixed(2)})`

  //     // setLightestColor(lightestColor);
  //     setDarkestColor(darkestColor)

  //     // remove image from canvas
  //     context.clearRect(0, 0, canvasElement.width, canvasElement.height)
  //   })
  // }, [cover])

  return (
    <>
      <AspectRatio
        ref={ref}
        ratio={1200 / 628}
        className={classNames({
          [coverImageField]: mode === 'form',
          [coverImageError]: Boolean(methods.formState.errors.cover?.message),
        })}
        onClick={onCoverClick}
        mb={21}
        mx={9}
      >
        {cover ? (
          cover?.attributes.mime.startsWith('image') ? (
            <Image
              src={
                cover?.attributes?.url
                  ? getStrapiUploadUrl(cover?.attributes?.url)
                  : '/placeholder.webp'
              }
              alt={cover?.attributes?.alternativeText ?? ''}
              width={1200}
              fit="cover"
              fallbackSrc="/images/placeholder.webp"
              placeholder="blur"
              loading="eager"
              radius={`${defaultRadius}px`}
            />
          ) : (
            <video
              src={cover?.attributes?.url ? getStrapiUploadUrl(cover?.attributes?.url) : undefined}
              width="100%"
              controls
            />
          )
        ) : (
          <Image src="/images/placeholder.webp" alt={''} width={1200} height={600} fit="cover" />
        )}
        {mode === 'form' && hovered ? (
          <Overlay color="black" backgroundOpacity={0.4} blur={4} zIndex={0}>
            <Text fw={600} c="white">
              Select an image or video
            </Text>
          </Overlay>
        ) : null}
      </AspectRatio>
      {methods.formState.errors.cover?.message ? (
        <Input.Error>{methods.formState.errors.cover.message}</Input.Error>
      ) : null}
      {/* <MediaUploadModal
        uploadMethods={['upload']}
        opened={uploadModalOpened}
        onClose={uploadModal.close}
        onSave={onSave}
      /> */}
    </>
  )
}

export default ArticleCoverField
