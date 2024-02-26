import { Modal, ModalProps } from '@mantine/core'

import { Media_Plain } from '@/types/Media'

import MediaUploadModalContent from './UploadModalContent'
import ToolTip from '../ToolTip'

export type MediaUploadModalProps = ModalProps & {
  uploadMethods?: Array<'upload' | 'link'>
  onSave: (type: 'video' | 'image', media: Media_Plain[], alt?: string) => void
  multiple?: boolean
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  uploadMethods = ['upload', 'link'],
  onSave,
  multiple,
  ...modalProps
}) => {
  return (
    // <ToolTip title="Upload media"> // TODO: ToolTip is not going away on mobile, and is not staying within screen borders
      <Modal {...modalProps} size="lg">
        <MediaUploadModalContent uploadMethods={uploadMethods} onSave={onSave} multiple={multiple} />
      </Modal>
    // </ToolTip>
  )
}

export default MediaUploadModal
