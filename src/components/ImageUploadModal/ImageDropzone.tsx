import { Button, Flex, Group, Image, rem, SimpleGrid, Stack, Text, TextInput } from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUploadFile } from '@/mutations/useUploadFile'
import { getStrapiUploadUrl } from '@/utils/cms'

type FormData = {
  alt: string
}

export type ImageUploadProps = {
  onSave: (options: { src: string; alt?: string | undefined }) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onSave }) => {
  const [files, setFiles] = useState<FileWithPath[]>([])

  const methods = useForm<FormData>()

  const { mutateAsync: uploadAsync, isPending: isUploading } = useUploadFile()

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return <Image key={index} src={imageUrl} alt="" onLoad={() => URL.revokeObjectURL(imageUrl)} />
  })

  const onDrop = useCallback((files: FileWithPath[]) => {
    const image = files[0]
    setFiles([image])
  }, [])

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (!files.length) return
      const uploadRes = await uploadAsync(files)
      const uploadedImage = uploadRes[0]
      const src = getStrapiUploadUrl(uploadedImage.url)
      onSave({ src, alt: data.alt })
    },
    [files, onSave, uploadAsync],
  )

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <Stack mt="lg">
        <Dropzone
          multiple={false}
          maxSize={5242880}
          accept={['image/*']}
          onDrop={onDrop}
          loading={isUploading}
        >
          <Group justify="center" mih={220} style={{ pointerEvents: 'none' }}>
            <Dropzone.Accept>
              <IconUpload
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto
                style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                stroke={1.5}
              />
            </Dropzone.Idle>

            <div>
              <Text inline>Drag image here or click to select file</Text>
              <Text size="sm" c="dimmed" inline mt={7}>
                Each file should not exceed 5mb
              </Text>
            </div>
          </Group>
        </Dropzone>

        <SimpleGrid cols={{ base: 1, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
          {previews}
        </SimpleGrid>

        <TextInput
          {...methods.register('alt')}
          label="Alternative text"
          type="text"
          placeholder="Image alternative text..."
        />

        <Flex justify="right">
          <Button type="submit" disabled={!files.length} loading={isUploading}>
            Save
          </Button>
        </Flex>
      </Stack>
    </form>
  )
}

export default ImageUpload
