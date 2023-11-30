'use client'

import { useDisclosure } from '@mantine/hooks'
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap'
import { IconPhoto } from '@tabler/icons-react'
import { useCallback } from 'react'

import ImageUploadModal from '@/components/ImageUploadModal'

const RichTextControlImage: React.FC = () => {
  const [uploadModalOpened, uploadModal] = useDisclosure()
  const { editor } = useRichTextEditorContext()

  const onSave = useCallback(
    (options: { src: string; alt?: string | undefined }) => {
      editor?.commands.setImage(options)
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
      <ImageUploadModal opened={uploadModalOpened} onClose={uploadModal.close} onSave={onSave} />
    </>
  )
}

export default RichTextControlImage
