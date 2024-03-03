import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Flex, Image, Rating, Stack, Text, Textarea, TextInput, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { array, number, object, ObjectSchema, string } from 'yup'

import { useSubmitReview } from '@/mutations/useSubmitReview'
import { Product } from '@/types/Product'
import { ReviewFormData } from '@/types/ReviewForm'
import { Media, Media_Plain } from '@/types/Media'
import { getStrapiUploadUrl } from '@/utils/cms'
import { useDisclosure } from '@mantine/hooks'
import MediaUploadModal from '@/components/MediaUploadModal'

const DEFAULT_VALUES: Partial<ReviewFormData> = {
  rating: 5,
}

const schema: ObjectSchema<ReviewFormData> = object({
  rating: number().required().min(1),
  user_name: string().required('Please input your name'),
  user_email: string().email('Invalid email address').required('Please input your email'),
  comment: string(),
  attachments: array(),
})

type ReviewFormProps = {
  product: Product
  onSuccess: () => void
}

const ReviewForm: React.FC<ReviewFormProps> = ({ product, onSuccess }) => {
  const methods = useForm<ReviewFormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(schema),
    shouldUseNativeValidation: false,
  })

  const { mutate: submit, isPending } = useSubmitReview(product.id)

  const [mediaFiles, setMediaFiles] = useState<Media[]>([]);
  const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>([]);
  const [uploadModalOpened, uploadModal] = useDisclosure()

  const onSubmit = useCallback(
    async (data: ReviewFormData) => {

      // TODO: reviews can't handle files
      submit(
        {
          ...data,
        },
        {
          onSettled: (data, error) => {
            if (data?.error || error) {
              console.error(data?.error || error)
              notifications.show({
                color: 'red',
                message: 'Unexpected error occurred',
              })
              return
            }
            notifications.show({
              message: 'Your review has been recorded. Thank you for your feedback.',
            })
            onSuccess()
          },
        },
      )
    },
    [onSuccess, submit],
  )

  const onImageSave = useCallback(
    (_type: 'video' | 'image', _media: Media_Plain[]) => {
      const media: Media[] = _media.map((mediaFile, i) => ({ id: mediaFile.id, attributes: mediaFile })); // we know for sure that user can only upload media by setting uploadMethods={['upload']}
      console.log('media', media);
      setMediaFiles(media);

      const mediaIds: number[] = media.map((file) => file.id);
      setSelectedMediaIds(mediaIds);

      uploadModal.close()

      methods.setValue(
        'attachments', media,
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true,
        },
      )
    },
    [methods, uploadModal],
  )

  const onFileClick = useCallback(() => {
    uploadModal.open()
  }, [uploadModal])

  const previews = () => mediaFiles.map((mediaFile, i) => {
    const url = getStrapiUploadUrl(mediaFile.attributes.url);

    return (
      <Box key={i} h={90} mb={30}>
        {mediaFile.attributes.mime.includes('image') ? (
          <Image src={url} alt={mediaFile.attributes.name} w={108} mr={30} />
        ) : (
          <video key={url} src={url} width='108px' controls />
        )}
        <Text fz="sm" lineClamp={1}>
          {mediaFile.attributes.name.slice(0, 14)}...
        </Text>
      </Box>
    )
  })

  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack gap={40}>
          <Flex gap="md">
            <Image
              src={
                product.attributes.thumbnail?.data.attributes.url
                  ? getStrapiUploadUrl(product.attributes.thumbnail?.data.attributes.url)
                  : ''
              }
              alt={product.attributes.name}
              width={100}
              height={100}
            />
            <Stack justify="space-between">
              <Text>{product.attributes.name}</Text>
              <Controller
                control={methods.control}
                name="rating"
                render={({ field: { value, onChange, ...fieldProps } }) => (
                  <Rating
                    value={value}
                    onChange={(val) =>
                      onChange({
                        target: {
                          value: val,
                        },
                      })
                    }
                    {...fieldProps}
                  />
                )}
              />
            </Stack>
          </Flex>
          <Stack gap="lg">
            <TextInput
              {...methods.register('user_name')}
              placeholder="Your name"
              error={methods.formState.errors.user_name?.message}
            />
            <TextInput
              {...methods.register('user_email')}
              placeholder="Your email"
              error={methods.formState.errors.user_email?.message}
            />
            <Textarea
              {...methods.register('comment')}
              placeholder="Share your feedback with us"
              minRows={4}
              error={methods.formState.errors.comment?.message}
              autosize
            />
            <Box display={'flex'}>
              {previews()}
            </Box>
            <Button onClick={onFileClick} variant='outline'>{mediaFiles.length ? 'Replace' : 'Add'} Media</Button>
            <MediaUploadModal
              uploadMethods={['upload']}
              opened={uploadModalOpened}
              onClose={uploadModal.close}
              onSave={onImageSave}
              multiple={true}
            />
          </Stack>
          <Button type="submit" loading={isPending} fullWidth>
            Submit review
          </Button>
        </Stack>
      </form>
    </>
  )
}

export default ReviewForm
