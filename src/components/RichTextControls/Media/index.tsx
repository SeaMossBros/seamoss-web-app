'use client'

import { useDisclosure } from '@mantine/hooks'
import { RichTextEditor } from '@mantine/tiptap'
import { IconPhoto } from '@tabler/icons-react'

// import { useCallback } from 'react'
import MediaUploadModal from '@/components/MediaUploadModal'
// import ToolTip from '@/components/ToolTip'
// import { Media_Plain } from '@/types/Media'
// import { getStrapiUploadUrl } from '@/utils/cms'

const RichTextControlMedia: React.FC = () => {
  const [uploadModalOpened, uploadModal] = useDisclosure()
  // const { editor } = useRichTextEditorContext()

  // const onSave = useCallback(
  //   (type: 'video' | 'image', media: Media_Plain | string, alt?: string) => {
  //     switch (type) {
  //       case 'image': {
  //         editor?.commands.setImage({
  //           src: getStrapiUploadUrl(typeof media === 'string' ? media : media.url),
  //           alt,
  //         })
  //         break
  //       }
  //       case 'video': {
  //         editor?.commands.setVideo({
  //           src: getStrapiUploadUrl(typeof media === 'string' ? media : media.url),
  //         })
  //         break
  //       }
  //       default:
  //         break
  //     }
  //     uploadModal.close()
  //   },
  //   [editor?.commands, uploadModal],
  // )

  return (
    <>
      {/* <ToolTip title="Attach media"> */}
      <RichTextEditor.Control onClick={uploadModal.open}>
        <IconPhoto stroke={1.5} size="1rem" />
      </RichTextEditor.Control>
      {/* </ToolTip> */}
      <MediaUploadModal opened={uploadModalOpened} onClose={uploadModal.close} />
    </>
  )
}

export default RichTextControlMedia
