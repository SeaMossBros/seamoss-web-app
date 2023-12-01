import { Button, Flex, Stack, TextInput } from '@mantine/core'
import { useCallback } from 'react'
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
    (data: FormData) => {
      onSave(isImage(data.url) ? 'image' : 'video', data.url, data.alt)
    },
    [onSave],
  )

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack mt="lg" gap="lg">
        <TextInput
          {...methods.register('url', {
            required: true,
          })}
          label="Media URL"
          type="url"
          placeholder="Paste image/video link here..."
          autoFocus
        />
        <TextInput
          {...methods.register('alt')}
          label="Alternative text"
          type="text"
          placeholder="Media alternative text..."
        />
        <Flex justify="right">
          <Button type="submit">Save</Button>
        </Flex>
      </Stack>
    </form>
  )
}

export default MediaFromLink
