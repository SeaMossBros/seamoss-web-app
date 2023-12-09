import { Box, Rating, Stack, Text } from '@mantine/core'

import { ProductReview } from '@/types/ProductReview'

import { reviewItem } from './ProductReviews.css'

export type ReviewItemProps = {
  review: ProductReview
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <Stack className={reviewItem} gap="xs">
      <Box>
        <Rating value={review.attributes.rating} size="xs" readOnly />
        <Text fw={600} fz="sm" mt={4}>
          {review.attributes.user_name}
        </Text>
      </Box>
      <Text>{review.attributes.comment}</Text>
    </Stack>
  )
}

export default ReviewItem
