import { Anchor, Card, Modal, ModalProps, Text } from '@mantine/core'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { AuthUser } from '@/types/Auth'
import { Product } from '@/types/Product'
import { ProductReview } from '@/types/ProductReview'

// import ToolTip from '../ToolTip'
import ReviewForm from './ReviewForm'

export type ReviewModalProps = ModalProps & {
  product: Product
  onSuccess: () => void
  user: AuthUser | null
  currentReview: ProductReview | null
  willDelete: boolean
}

const ReviewModal: React.FC<ReviewModalProps> = ({
  product,
  currentReview,
  onSuccess,
  user,
  willDelete,
  ...props
}) => {
  return (
    // <ToolTip title="Write a review">
    <Modal
      id="review-modal"
      {...props}
      pt={24}
      pr={24}
      pb={24}
      closeOnClickOutside={true}
      closeOnEscape={false}
      centered
    >
      {!user ? (
        <Card pt={0}>
          <Text mb={21} fz={'xl'} fw={500}>
            Please{' '}
            <Anchor href={ROUTE_PATHS.LOGIN} fz={'xl'} fw={500}>
              login
            </Anchor>{' '}
            first
          </Text>
          <Text mb={12} fz={'md'} fw={300}>
            We appreciate you sharing your feedback with us and our customers!
          </Text>
          <Text mb={12} fz={'md'} fw={300}>
            We ask you to login first to limit fake reviews, thank you for understanding!
          </Text>
          <Text mb={12} fz={'md'} fw={300}>
            If you have a complaint and want help regarding your purchase, please{' '}
            <Anchor href={ROUTE_PATHS.SUPPORT} fz={'md'} fw={300}>
              contact support
            </Anchor>
          </Text>
        </Card>
      ) : (
        <ReviewForm
          product={product}
          currentReview={currentReview}
          onSuccess={onSuccess}
          user={user}
          willDelete={willDelete}
        />
      )}
    </Modal>
    // </ToolTip>
  )
}

export default ReviewModal
