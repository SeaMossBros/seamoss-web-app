import {
  Box,
  Button,
  Flex,
  Group,
  Image,
  rem,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
import { Dropzone, FileWithPath } from '@mantine/dropzone'
import { IconPhoto, IconUpload, IconX } from '@tabler/icons-react'
import { BaseSyntheticEvent, useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { useUploadFile } from '@/mutations/useUploadFile'
import { useUploadFileInfo } from '@/mutations/useUploadFileInfo'
import { Media_Plain } from '@/types/Media'

type FormData = {
  alt: string
}

export type MediaUploadProps = {
  onSave: (type: 'video' | 'image', media: Media_Plain[], alt?: string) => void
  multiple?: boolean
}

const MediaUpload: React.FC<MediaUploadProps> = ({ onSave, multiple }) => {
  const [files, setFiles] = useState<FileWithPath[]>([])
  const maxFiles = 3

  const methods = useForm<FormData>()

  const { mutateAsync: uploadAsync, isPending: isUploading } = useUploadFile()
  const { mutateAsync: uploadFileInfoAsync, isPending: isUpdatingInfo } = useUploadFileInfo()

  const previews = files.map((file, index) => {
    const url = URL.createObjectURL(file)

    return (
      <Box key={index} h={90}>
        {file.type.startsWith('image') ? (
          <Image src={url} alt="" onLoad={() => URL.revokeObjectURL(url)} h={90} />
        ) : (
          <video key={url} src={url} width="100%" controls />
        )}
        <Text fz="sm" lineClamp={1}>
          {file.name}
        </Text>
      </Box>
    )
  })

  const onDrop = useCallback((files: FileWithPath[]) => {
    setFiles([...files])
  }, [])

  const onSubmit = useCallback(
    async (data: FormData, e?: BaseSyntheticEvent) => {
      e?.stopPropagation()
      if (!files.length) return
      const uploadRes = await uploadAsync(files)
      let uploadedMedia = uploadRes[0]
      if (!uploadedMedia) return

      if (data.alt) {
        const res = await uploadFileInfoAsync({
          id: uploadedMedia.id,
          info: {
            alternativeText: data.alt,
          },
        })

        uploadedMedia = res
      }

      console.log('uploadedMedia:::', uploadedMedia)

      onSave(
        uploadedMedia.mime.startsWith('image') ? 'image' : 'video',
        multiple ? uploadRes : [uploadedMedia],
        data.alt,
      )
    },
    [files, onSave, uploadAsync, uploadFileInfoAsync, multiple],
  )

  return (
    <Stack mt="lg">
      <Dropzone
        multiple={!!multiple}
        maxFiles={!!multiple ? maxFiles : 1}
        // maxSize={26214400}
        accept={['image/*', 'video/*']}
        onDrop={onDrop}
        loading={isUploading || isUpdatingInfo}
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
            <Text inline>Click to select file(s) or drag image/video here</Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              Each file should not exceed 25mb
            </Text>
            <Text size="sm" c="dimmed" inline mt={7}>
              *{maxFiles} files max
            </Text>
          </div>
        </Group>
      </Dropzone>

      <SimpleGrid cols={{ base: 3, sm: 4 }} mt={previews.length > 0 ? 'xl' : 0}>
        {previews}
      </SimpleGrid>

      <TextInput
        {...methods.register('alt')}
        mt={30}
        label="Alternative text"
        type="text"
        placeholder="Media alternative text..."
      />

      <Flex justify="right">
        <Button
          type="button"
          onClick={methods.handleSubmit(onSubmit)}
          disabled={!files.length}
          loading={isUploading || isUpdatingInfo}
        >
          Save
        </Button>
      </Flex>
    </Stack>
  )
}

export default MediaUpload
