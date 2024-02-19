import { Modal, ModalProps } from '@mantine/core'
import React from 'react'

import { Product } from '@/types/Product'

import ReviewForm from './ReviewForm'
import ToolTip from '../ToolTip'

export type ReviewModalProps = ModalProps & {
  product: Product
  onSuccess: () => void
}

const ReviewModal: React.FC<ReviewModalProps> = ({ product, onSuccess, ...props }) => {
  return (
    // <ToolTip title="Write a review">
      <Modal
        {...props}
        padding={24}
        closeOnClickOutside={false}
        closeOnEscape={false}
        centered
        >
        {props.opened ? <ReviewForm product={product} onSuccess={onSuccess} /> : null}
      </Modal>
    // </ToolTip>
  )
}

export default ReviewModal
