import { yupResolver } from '@hookform/resolvers/yup'
import {
  Anchor,
  Button,
  Flex,
  Image,
  Rating,
  Stack,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
// import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { array, number, object, ObjectSchema, string } from 'yup'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useDeleteReview } from '@/mutations/useDeleteReview'
// import MediaUploadModal from '@/components/MediaUploadModal'
import { useSubmitReview } from '@/mutations/useSubmitReview'
import { useUpdateReview } from '@/mutations/useUpdateReview'
import { AuthUser } from '@/types/Auth'
import { Product } from '@/types/Product'
import { ProductReview } from '@/types/ProductReview'
import { ReviewFormData } from '@/types/ReviewForm'
import { getStrapiUploadUrl } from '@/utils/cms'

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
  user: AuthUser | null
  currentReview: ProductReview | null
  willDelete: boolean
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  product,
  onSuccess,
  user,
  currentReview,
  willDelete,
}) => {
  const [hasClickedRating, setHasClickedRating] = useState(willDelete)
  const { defaultRadius, colors } = useMantineTheme()
  const isLoggedIn = !!user && !!user.email
  const userHasUsername = isLoggedIn && !!user.username

  const DEFAULT_VALUES: Partial<ReviewFormData> = {
    rating: currentReview ? currentReview.attributes.rating : 5,
    user_email: isLoggedIn ? user.email : '',
    user_name: userHasUsername
      ? currentReview
        ? currentReview.attributes.user_name
        : user.username
      : '',
    comment: currentReview ? currentReview.attributes.comment : '',
  }

  const methods = useForm<ReviewFormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(schema),
    shouldUseNativeValidation: false,
  })

  const { mutate: submit, isPending } = useSubmitReview(product.id)
  const { mutate: update } = useUpdateReview()
  const { mutate: deleteReview } = useDeleteReview()

  // const [mediaFiles, setMediaFiles] = useState<Media[]>([])
  // const [selectedMediaIds, setSelectedMediaIds] = useState<number[]>([])
  // const [uploadModalOpened, uploadModal] = useDisclosure()

  const onSubmit = useCallback(
    async (data: ReviewFormData) => {
      // TODO: reviews can't handle files
      submit(
        {
          rating: data.rating,
          comment: data.comment,
          user_email: isLoggedIn ? user.email : data.user_email,
          user_name: userHasUsername ? user.username : data.user_name,
          // attachments: selectedMediaIds,
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

  const onUpdate = useCallback(
    async (data: ReviewFormData) => {
      if (currentReview?.id === undefined) return
      // TODO: reviews can't handle files
      update(
        {
          id: currentReview.id,
          rating: data.rating,
          comment: data.comment,
          user_email: isLoggedIn ? user.email : data.user_email,
          user_name: data.user_name,
          // attachments: selectedMediaIds,
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
              message: 'Your review has been updated!',
            })
            onSuccess()
          },
        },
      )
    },
    [onSuccess, update],
  )

  const onDelete = useCallback(async () => {
    if (currentReview?.id === undefined) return
    deleteReview(currentReview.id || null, {
      onSettled: (data: any, error: any) => {
        if (data?.error || error) {
          console.error(data?.error || error)
          notifications.show({
            color: 'red',
            message: 'Unexpected error occurred',
          })
          return
        }
        notifications.show({
          variant: 'success',
          message: (
            <Flex direction={'column'}>
              <Text mb={12}>Review deleted! We hope you still enjoyed our product.</Text>
              <Text>
                If you want to report an issue with the product you recieved, please{' '}
                <Anchor href={ROUTE_PATHS.SUPPORT}>please leave support a message</Anchor>
              </Text>
            </Flex>
          ),
        })
        onSuccess()
      },
    })
  }, [onSuccess, deleteReview])
  // const onImageSave = useCallback(
  //   (_type: 'video' | 'image', _media: Media_Plain[]) => {
  //     const media: Media[] = _media.map((mediaFile) => ({
  //       id: mediaFile.id,
  //       attributes: mediaFile,
  //     })) // we know for sure that user can only upload media by setting uploadMethods={['upload']}
  //     // console.log('media', media)
  //     setMediaFiles(media)

  //     const mediaIds: number[] = media.map((file) => file.id)
  //     setSelectedMediaIds(mediaIds)

  //     uploadModal.close()

  //     methods.setValue('attachments', media, {
  //       shouldValidate: true,
  //       shouldDirty: true,
  //       shouldTouch: true,
  //     })
  //   },
  //   [methods, uploadModal],
  // )

  // const onFileClick = useCallback(() => {
  //   uploadModal.open()
  // }, [uploadModal])

  // const previews = () => mediaFiles.map((mediaFile, i) => {
  //   const url = getStrapiUploadUrl(mediaFile.attributes.url)

  //   return (
  //     <Box key={i} h={90} mb={30}>
  //       {mediaFile.attributes.mime.includes('image') ? (
  //         <Image src={url} alt={mediaFile.attributes.name} w={108} mr={30} />
  //       ) : (
  //         <video key={url} src={url} width="108px" controls />
  //       )}
  //       <Text fz="sm" lineClamp={1}>
  //         {mediaFile.attributes.name.slice(0, 14)}...
  //       </Text>
  //     </Box>
  //   )
  // })

  return (
    <>
      <form
        onSubmit={methods.handleSubmit(
          !!currentReview ? (willDelete ? onDelete : onUpdate) : onSubmit,
        )}
      >
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
              {!willDelete && <Text fz={'xs'}>Select your rating</Text>}
              <Flex h={24}>
                <Controller
                  control={methods.control}
                  name="rating"
                  render={({ field: { value, onChange, ...fieldProps } }) => (
                    <Rating
                      value={value}
                      readOnly={willDelete}
                      onChange={(val) => {
                        if (willDelete) return
                        setHasClickedRating(true)
                        onChange({
                          target: {
                            value: val,
                          },
                        })
                      }}
                      {...fieldProps}
                      onMouseEnter={() => setHasClickedRating(true)}
                    />
                  )}
                />
                {!hasClickedRating && (
                  <Image src={'/images/click-animated-icon8.gif'} h={36} w={36} />
                )}
              </Flex>
            </Stack>
          </Flex>
          <Stack gap="lg">
            <TextInput
              {...methods.register('user_name')}
              placeholder="Your username"
              error={methods.formState.errors.user_name?.message}
              readOnly={willDelete}
            />
            <Flex w={'100%'} h={'fit-content'}>
              <TextInput
                {...methods.register('user_email')}
                placeholder="Your email"
                error={methods.formState.errors.user_email?.message}
                readOnly={isLoggedIn}
                disabled={isLoggedIn}
                w={'100%'}
                mr={3}
              />
              {isLoggedIn && (
                <Text
                  miw={'fit-content'}
                  maw={'fit-content'}
                  w={'fit-content'}
                  style={{
                    border: `1px solid ${colors.gray[2]}`,
                    borderRadius: defaultRadius,
                    alignItems: 'center',
                  }}
                  c={colors.gray[6]}
                  fw={300}
                  fz={'xs'}
                  display={'flex'}
                  px={6}
                >
                  You&apos;re Logged In
                </Text>
              )}
            </Flex>
            <Textarea
              {...methods.register('comment')}
              placeholder="Share your feedback with others"
              minRows={4}
              error={methods.formState.errors.comment?.message}
              autosize
              readOnly={willDelete}
            />
            {/* <Box display={'flex'}>{previews()}</Box> */}
            {/* <Button onClick={onFileClick} variant="outline">
              {mediaFiles.length ? 'Replace' : 'Add'} Media
            </Button> */}
            {/* <MediaUploadModal
              uploadMethods={['upload']}
              opened={uploadModalOpened}
              onClose={uploadModal.close}
              onSave={onImageSave}
              multiple={true}
            /> */}
          </Stack>
          <Flex justify={'space-between'} w={'100%'}>
            {willDelete && (
              <Button w={'48%'} variant="outline" onClick={onSuccess}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              loading={isPending}
              w={willDelete ? '48%' : '100%'}
              bg={willDelete ? colors.red[9] : ''}
            >
              {currentReview ? (willDelete ? 'Delete ' : 'Update ') : 'Submit '}Review
            </Button>
          </Flex>
        </Stack>
      </form>
    </>
  )
}

export default ReviewForm
