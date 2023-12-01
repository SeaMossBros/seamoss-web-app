'use client'
import { rem, Tabs } from '@mantine/core'
import { IconLink, IconPhotoUp } from '@tabler/icons-react'

import { Media_Plain } from '@/types/Media'

import MediaUpload from './MediaDropzone'
import MediaFromLink from './MediaFromLink'

export type MediaUploadModalContentProps = {
  uploadMethods?: Array<'upload' | 'link'>
  onSave: (type: 'video' | 'image', media: Media_Plain | string, alt?: string) => void
}

const MediaUploadModalContent: React.FC<MediaUploadModalContentProps> = ({
  onSave,
  uploadMethods,
}) => {
  const iconStyle = { width: rem(24), height: rem(12) }

  return (
    <Tabs defaultValue="upload">
      <Tabs.List>
        {uploadMethods?.includes('upload') ? (
          <Tabs.Tab value="upload" leftSection={<IconPhotoUp style={iconStyle} />} py="sm" w="50%">
            Upload
          </Tabs.Tab>
        ) : null}
        {uploadMethods?.includes('link') ? (
          <Tabs.Tab value="link" leftSection={<IconLink style={iconStyle} />} py="sm" w="50%">
            Get from link
          </Tabs.Tab>
        ) : null}
      </Tabs.List>
      <Tabs.Panel value="upload">
        <MediaUpload onSave={onSave} />
      </Tabs.Panel>
      <Tabs.Panel value="link">
        <MediaFromLink onSave={onSave} />
      </Tabs.Panel>
    </Tabs>
  )
}

export default MediaUploadModalContent
