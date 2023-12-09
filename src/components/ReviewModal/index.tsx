import { Modal, ModalProps } from '@mantine/core'
import React from 'react'

import { Product } from '@/types/Product'

import ReviewForm from './ReviewForm'

export type ReviewModalProps = ModalProps & {
  product: Product
  onSuccess: () => void
}

const ReviewModal: React.FC<ReviewModalProps> = ({ product, onSuccess, ...props }) => {
  return (
    <Modal
      {...props}
      padding={24}
      title="Write a review"
      closeOnClickOutside={false}
      closeOnEscape={false}
      centered
    >
      {props.opened ? <ReviewForm product={product} onSuccess={onSuccess} /> : null}
    </Modal>
  )
}

export default ReviewModal
