import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Flex, Image, Rating, Stack, Text, Textarea, TextInput, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import React, { useCallback, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { array, number, object, ObjectSchema, string } from 'yup'

import { useSubmitReview } from '@/mutations/useSubmitReview'
import { Product } from '@/types/Product'
import { ReviewFormData } from '@/types/ReviewForm'
import { Media } from '@/types/Media'
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
  const { colors } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const getPrimaryColor = () => isDarkTheme ? colors.red[9] : colors.teal[9];

  const methods = useForm<ReviewFormData>({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(schema),
    shouldUseNativeValidation: false,
  })

  const { mutate: submit, isPending } = useSubmitReview(product.id)

  // const [selectedMediaIds, setSelectedMediaIds] = useState<File[]>([]);
  const [uploadModalOpened, uploadModal] = useDisclosure()

  const onSubmit = useCallback(
    async (data: ReviewFormData) => {
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

  const handleSaveMedia = async (selectedFiles: File[] | null) => {
    if (!selectedFiles) return;

    try {
      const filesArray = Array.from(selectedFiles); // TODO: check to see if needed (already is past as array)
      if (!filesArray.length) return;
      // setSelectedMediaIds(filesArray);

      const output = document.getElementById("review-files-output");
      if (!output) return;
      output.innerHTML = '';

      for (let i = 0; i < filesArray.length; i++) {
        if (filesArray[i].type.includes('video')) {
          const vid = document.createElement("video");
          const src = document.createElement("source");
          vid.height = 60;
          vid.controls = true;
          src.src = URL.createObjectURL(filesArray[i]);
          src.type = filesArray[i].type; 
          src.onload = () => {
            URL.revokeObjectURL(src.src);
          };
          vid.append(src);
          output.append(vid);
          continue;
        }
        const img = document.createElement("img");
        img.src = URL.createObjectURL(filesArray[i]);
        img.height = 60;
        img.onload = () => {
          URL.revokeObjectURL(img.src);
        };
        output.appendChild(img);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const onSave = useCallback(
    (_type: 'video' | 'image', _media: any[]) => {
      console.log('media on save', _media);
      const media: number[] = _media  // we know for sure that user can only upload media by setting uploadMethods={['upload']}
      uploadModal.close()
      // methods.setValue(
      //   'attachments', media,
      //   {
      //     shouldValidate: true,
      //     shouldDirty: true,
      //     shouldTouch: true,
      //   },
      // )
    },
    [methods, uploadModal],
  )

  const onFileClick = useCallback(() => {
    uploadModal.open()
  }, [uploadModal])

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
            {/* <Stack 
              className={attachmentUploadTrigger}
            >
              <input
                id="review-files"
                type="file"
                multiple
                title='Add Media'
                onChange={(e: any) => handleSaveMedia(e.target.files)}
              />
              <pre id="review-files-output">Selected files:</pre>
            </Stack> */}
            <Button onClick={onFileClick} variant='outline'>Add Media</Button>
            <MediaUploadModal
              uploadMethods={['upload']}
              opened={uploadModalOpened}
              onClose={uploadModal.close}
              onSave={onSave}
              multiple={true}
            />
          </Stack>
          <Button type="submit" loading={isPending} fullWidth bg={getPrimaryColor()}>
            Submit review
          </Button>
        </Stack>
      </form>
    </>
  )
}

export default ReviewForm
