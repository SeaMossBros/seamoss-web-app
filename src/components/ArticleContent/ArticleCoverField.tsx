import { AspectRatio, Image, Input, Overlay, Text } from '@mantine/core'
import { useDisclosure, useHover } from '@mantine/hooks'
import classNames from 'classnames'
import omit from 'lodash/omit'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ArticleFormData } from '@/types/ArticleForm'
import { Media_Plain } from '@/types/Media'
import { getStrapiUploadUrl } from '@/utils/cms'

import MediaUploadModal from '../MediaUploadModal'
import { ArticleComponentCommonProps } from './common'
import { coverImageError, coverImageField } from './styles.css'

export type ArticleCoverFieldProps = ArticleComponentCommonProps

const ArticleCoverField: React.FC<ArticleCoverFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

  const cover = methods.watch('cover')

  const { ref, hovered } = useHover()
  const [uploadModalOpened, uploadModal] = useDisclosure()

  const onCoverClick = useCallback(() => {
    if (mode !== 'form') return
    uploadModal.open()
  }, [mode, uploadModal])

  const onSave = useCallback(
    (_type: 'video' | 'image', _media: string | Media_Plain) => {
      const media = _media as Media_Plain // we know for sure that user can only upload media by setting uploadMethods={['upload']}
      uploadModal.close()
      methods.setValue(
        'cover',
        {
          id: media.id,
          attributes: omit(media, 'id'),
        },
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      )
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
          [coverImageError]: Boolean(methods.formState.errors.cover?.message),
        })}
        onClick={onCoverClick}
      >
        {cover ? (
          cover?.attributes.mime.startsWith('image') ? (
            <Image
              src={cover?.attributes?.url ? getStrapiUploadUrl(cover?.attributes?.url) : undefined}
              alt={cover?.attributes?.alternativeText ?? ''}
              width={1200}
              height={628}
              fit="cover"
              fallbackSrc="/images/placeholder.webp"
              placeholder="blur"
              loading='eager'
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
            src="/images/placeholder.webp"
            alt={''}
            width={1200}
            height={600}
            fit="cover"
          />
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
