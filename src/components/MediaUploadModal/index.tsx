import { Modal, ModalProps } from '@mantine/core'

import { Media_Plain } from '@/types/Media'

import MediaUploadModalContent from './UploadModalContent'

export type MediaUploadModalProps = ModalProps & {
  uploadMethods?: Array<'upload' | 'link'>
  onSave: (media: Media_Plain | string, alt?: string) => void
}

const MediaUploadModal: React.FC<MediaUploadModalProps> = ({
  uploadMethods = ['upload', 'link'],
  onSave,
  ...modalProps
}) => {
  return (
    <Modal {...modalProps} title="Upload media" size="lg">
      <MediaUploadModalContent uploadMethods={uploadMethods} onSave={onSave} />
    </Modal>
  )
}

export default MediaUploadModal
