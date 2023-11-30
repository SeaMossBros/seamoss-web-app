'use client'
import { rem, Tabs } from '@mantine/core'
import { IconLink, IconPhotoUp } from '@tabler/icons-react'

import ImageUpload from './ImageDropzone'
import ImageFromLink from './ImageFromLink'

export type ImageUploadModalContentProps = {
  onSave: (options: { src: string; alt?: string | undefined }) => void
}

const ImageUploadModalContent: React.FC<ImageUploadModalContentProps> = ({ onSave }) => {
  const iconStyle = { width: rem(24), height: rem(12) }

  return (
    <Tabs defaultValue="upload">
      <Tabs.List>
        <Tabs.Tab value="upload" leftSection={<IconPhotoUp style={iconStyle} />} py="sm" w="50%">
          Upload
        </Tabs.Tab>
        <Tabs.Tab value="link" leftSection={<IconLink style={iconStyle} />} py="sm" w="50%">
          Get from link
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="upload">
        <ImageUpload onSave={onSave} />
      </Tabs.Panel>
      <Tabs.Panel value="link">
        <ImageFromLink onSave={onSave} />
      </Tabs.Panel>
    </Tabs>
  )
}

export default ImageUploadModalContent
