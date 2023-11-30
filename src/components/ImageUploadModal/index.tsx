import { Modal, ModalProps } from '@mantine/core'

import ImageUploadModalContent from './UploadModalContent'

export type ImageUploadModalProps = ModalProps & {
  onSave: (options: { src: string; alt?: string | undefined }) => void
}

const ImageUploadModal: React.FC<ImageUploadModalProps> = ({ onSave, ...modalProps }) => {
  return (
    <Modal {...modalProps} title="Upload image" size="lg">
      <ImageUploadModalContent onSave={onSave} />
    </Modal>
  )
}

export default ImageUploadModal
