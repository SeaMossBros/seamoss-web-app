'use client'

import { Center, Container, Flex, Group, Pagination, Stack, useMantineTheme } from '@mantine/core'

import ReviewItem from '@/components/ProductReviews/ReviewItem'
import { AuthUser } from '@/types/Auth'
import { ProductReview } from '@/types/ProductReview'
import { QueryResponse } from '@/types/QueryResponse'

import { reviewStyle, reviewsWrapper } from './reviews-list.css'

interface OrdersListProps {
  reviews: QueryResponse<ProductReview[]>
  onChangePage: () => void
  totalPages: number
  showUpdateModal: (review: ProductReview | null) => void
  user: AuthUser
}

const ReviewsList = ({
  reviews,
  onChangePage,
  totalPages,
  showUpdateModal,
  user,
}: OrdersListProps) => {
  const { defaultRadius } = useMantineTheme()
  if (!reviews || !reviews.data) return <div>no reviews</div>

  return (
    <Container className={reviewsWrapper}>
      <Group className={reviewStyle} style={{ borderRadius: defaultRadius }}>
        <Flex direction={'column'} mt="xl" w={'100%'}>
          {reviews.data.map((review, i) => {
            return (
              <Stack gap={0} key={i}>
                <ReviewItem
                  key={review.id}
                  review={review}
                  isOnProfile={true}
                  showUpdateModal={showUpdateModal}
                  isCurrentUsersReview={review.attributes.user_email === user?.email}
                />
              </Stack>
            )
          })}
          <Center pt={21}>
            <Pagination
              total={totalPages}
              value={reviews?.meta.pagination.page}
              onChange={onChangePage}
            />
          </Center>
        </Flex>
      </Group>
    </Container>
  )
}

export default ReviewsList
