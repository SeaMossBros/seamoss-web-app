'use client'

import { useDisclosure } from '@mantine/hooks'
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap'
import { IconPhoto } from '@tabler/icons-react'
import { useCallback } from 'react'

import MediaUploadModal from '@/components/MediaUploadModal'
import { Media_Plain } from '@/types/Media'
import { getStrapiUploadUrl } from '@/utils/cms'

const RichTextControlImage: React.FC = () => {
  const [uploadModalOpened, uploadModal] = useDisclosure()
  const { editor } = useRichTextEditorContext()

  const onSave = useCallback(
    (media: Media_Plain | string, alt?: string) => {
      editor?.commands.setImage({
        src: getStrapiUploadUrl(typeof media === 'string' ? media : media.url),
        alt,
      })
      uploadModal.close()
    },
    [editor?.commands, uploadModal],
  )

  return (
    <>
      <RichTextEditor.Control
        onClick={uploadModal.open}
        aria-label="Attach image"
        title="Attach image"
      >
        <IconPhoto stroke={1.5} size="1rem" />
      </RichTextEditor.Control>
      <MediaUploadModal opened={uploadModalOpened} onClose={uploadModal.close} onSave={onSave} />
    </>
  )
}

export default RichTextControlImage
