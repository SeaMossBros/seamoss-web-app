import { Button, Flex, Stack, TextInput } from '@mantine/core'
import { BaseSyntheticEvent, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { isImage } from '@/utils/common'

type FormData = {
  url: string
  alt: string
}

export type MediaFromLinkProps = {
  onSave: (type: 'video' | 'image', media: string, alt?: string) => void
}

const MediaFromLink: React.FC<MediaFromLinkProps> = ({ onSave }) => {
  const methods = useForm<FormData>()

  const onSubmit = useCallback(
    (data: FormData, e?: BaseSyntheticEvent) => {
      e?.stopPropagation()
      onSave(isImage(data.url) ? 'image' : 'video', data.url, data.alt)
    },
    [onSave],
  )

  return (
    <Stack mt="lg" gap="lg">
      <TextInput
        {...methods.register('url', {
          required: true,
        })}
        label="Media URL"
        type="url"
        placeholder="Paste image/video link here..."
        autoFocus
        withAsterisk
      />
      <TextInput
        {...methods.register('alt')}
        label="Alternative text"
        type="text"
        placeholder="Media alternative text..."
      />
      <Flex justify="right">
        <Button type="button" onClick={methods.handleSubmit(onSubmit)}>
          Save
        </Button>
      </Flex>
    </Stack>
  )
}

export default MediaFromLink
