import { Box, Rating, Stack, Text } from '@mantine/core'
import { useMemo } from 'react'

import { Media } from '@/types/Media'
import { ProductReview } from '@/types/ProductReview'

import { reviewItem } from './ProductReviews.css'

export type ReviewItemProps = {
  review: ProductReview
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  const files = useMemo(() => {
    return review.attributes.attachments?.data || []
  }, [review.attributes.attachments?.data])

  const getFileElement = (file: Media) => {
    if (file.attributes.url.includes('mp4')) {
      return (
        <video height={120} controls>
          <source src={file.attributes.url} type="video/mp4" />
        </video>
      )
    }

    return <img src={file.attributes.url} height={120} alt={file.attributes.alternativeText} />
  }
  // console.log('review', review);
  return (
    <Stack className={reviewItem} gap="xs">
      <Box>
        <Rating value={review.attributes.rating} size="xs" readOnly />
        <Text fw={600} fz="sm" mt={4}>
          {review.attributes.user_name}
        </Text>
        <div className="media">
          {files.length > 0 && files.map((file, i) => <div key={i}>{getFileElement(file)}</div>)}
        </div>
      </Box>
      <Text>{review.attributes.comment}</Text>
    </Stack>
  )
}

export default ReviewItem
