import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Flex, Image, Rating, Stack, Text, Textarea, TextInput } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import NextImage from 'next/image'
import React, { useCallback } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { array, number, object, ObjectSchema, string } from 'yup'

import { useSubmitReview } from '@/mutations/useSubmitReview'
import { Product } from '@/types/Product'
import { ReviewFormData } from '@/types/ReviewForm'
import { getStrapiUploadUrl } from '@/utils/cms'

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

  const onSubmit = useCallback(
    (data: ReviewFormData) => {
      submit(
        {
          ...data,
          attachments: data.attachments?.map((media) => media.id),
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

  return (
    <>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack gap={40}>
          <Flex gap="md">
            <Image
              component={NextImage}
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
            {/* <Stack className={attachmentUploadTrigger}>
              <Stack>
                <Center>
                  <IconPlus color={defaultThemeVars.colors.gray[6]} size={40} />
                </Center>
                <Center>
                  <Text fz="xs" component="p" c="gray.8">
                    Add photos
                  </Text>
                </Center>
              </Stack>
            </Stack> */}
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
