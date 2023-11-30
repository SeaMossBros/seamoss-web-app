import { Button, Flex, Stack, TextInput } from '@mantine/core'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  url: string
  alt: string
}

export type ImageFromLinkProps = {
  onSave: (options: { src: string; alt?: string | undefined }) => void
}

const ImageFromLink: React.FC<ImageFromLinkProps> = ({ onSave }) => {
  const methods = useForm<FormData>()

  const onSubmit = useCallback(
    (data: FormData) => {
      onSave({
        src: data.url,
        alt: data.alt,
      })
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
          label="Image URL"
          type="url"
          placeholder="Paste image link here..."
          autoFocus
        />
        <TextInput
          {...methods.register('alt')}
          label="Alternative text"
          type="text"
          placeholder="Image alternative text..."
        />
        <Flex justify="right">
          <Button type="submit">Save</Button>
        </Flex>
      </Stack>
    </form>
  )
}

export default ImageFromLink
