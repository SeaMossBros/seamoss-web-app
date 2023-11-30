import { AspectRatio, Image, Overlay, Text } from '@mantine/core'
import { useDisclosure, useHover } from '@mantine/hooks'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { default as NextImage } from 'next/image'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ArticleFormData } from '@/types/ArticleForm'
import { Media_Plain } from '@/types/Media'
import { getStrapiUploadUrl } from '@/utils/cms'

import MediaUploadModal from '../MediaUploadModal'
import { ArticleComponentCommonProps } from './common'
import { coverImageField } from './styles.css'

export type ArticleCoverFieldProps = ArticleComponentCommonProps

const ArticleCoverField: React.FC<ArticleCoverFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

  const cover = methods.watch('cover')

  const { ref, hovered } = useHover()
  const [uploadModalOpened, uploadModal] = useDisclosure()

  const onCoverClick = useCallback(() => {
    uploadModal.open()
  }, [uploadModal])

  const onSave = useCallback(
    (_media: string | Media_Plain) => {
      const media = _media as Media_Plain // we know for sure that user can only upload media by setting uploadMethods={['upload']}
      uploadModal.close()
      methods.setValue('cover', {
        id: media.id,
        attributes: omit(media, 'id'),
      })
    },
    [methods, uploadModal],
  )

  return (
    <>
      <AspectRatio
        ref={ref}
        ratio={1200 / 628}
        className={classNames({
          [coverImageField]: mode === 'form',
        })}
        onClick={onCoverClick}
      >
        {cover ? (
          cover?.attributes.mime.startsWith('image') ? (
            <Image
              component={NextImage}
              src={cover?.attributes?.url ? getStrapiUploadUrl(cover?.attributes?.url) : undefined}
              alt={cover?.attributes?.alternativeText ?? ''}
              width={1200}
              height={600}
              fit="cover"
              fallbackSrc="/images/placeholder.webp"
              priority
            />
          ) : (
            <video
              src={cover?.attributes?.url ? getStrapiUploadUrl(cover?.attributes?.url) : undefined}
              width="100%"
              controls
            />
          )
        ) : (
          <Image
            component={NextImage}
            src="/images/placeholder.webp"
            alt={''}
            width={1200}
            height={600}
            fit="cover"
          />
        )}
        {mode === 'form' && hovered ? (
          <Overlay color="black" backgroundOpacity={0.4} blur={4}>
            <Text fw={600} c="white">
              Select an image or video
            </Text>
          </Overlay>
        ) : null}
      </AspectRatio>
      <MediaUploadModal
        uploadMethods={['upload']}
        opened={uploadModalOpened}
        onClose={uploadModal.close}
        onSave={onSave}
      />
    </>
  )
}

export default ArticleCoverField
