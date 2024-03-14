'use client'

import { Group, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useCallback, useMemo, useState } from 'react'

import ReviewModal from '@/components/ReviewModal'
import { useProductReviews } from '@/queries/useProductReviews'
import { AuthUser } from '@/types/Auth'
import { ProductReview } from '@/types/ProductReview'
import { PaginationOptions } from '@/types/QueryParams'

import { totalTitleStyle } from '../profile-page.css'
import ReviewsList from './ReviewsList'

interface OrdersListProps {
  user: AuthUser
}

const ReviewsContainer = ({ user }: OrdersListProps) => {
  const [review, setReview] = useState<ProductReview | null>(null)
  const [reviewModalOpened, reviewModal] = useDisclosure()
  const [willDelete, setWillDelete] = useState(false)
  const [pagination, setPagination] = useState<Pick<PaginationOptions, 'page' | 'pageSize'>>({
    page: 1,
    pageSize: 3,
  })

  const { data: reviews, refetch: refetchReviews } = useProductReviews(
    {
      filters: {
        user_email: user.email,
      },
      pagination: {
        withCount: true,
        ...pagination,
      },
      populate: {
        product: {
          populate: '*',
        },
      },
    },
    {
      enabled: Boolean(user.email),
    },
  )

  const { total, totalPages } = useMemo(() => {
    const _total = reviews?.meta.pagination.total ?? 1
    const _totalPages = Math.ceil(_total / (pagination.pageSize ?? 10))

    return {
      total: _total,
      totalPages: _totalPages,
    }
  }, [pagination.pageSize, reviews?.meta.pagination.total])

  const onChangePage = useCallback(
    (_page: number = 1) => {
      setPagination((prev) => ({
        ...prev,
        page: _page,
      }))
    },
    [setPagination],
  )

  const onReviewSubmitted = useCallback(() => {
    reviewModal.close()
    refetchReviews()
    setTimeout(() => {
      refetchReviews?.()
    }, 500)
  }, [refetchReviews, reviewModal])

  const showUpdateModal = (review: ProductReview | null, willDelete: boolean = false) => {
    if (review) {
      setReview(review)
      setWillDelete(willDelete)
      reviewModal.open()
    }
  }

  if (!user.id) return <div>no user</div>
  if (!reviews || !reviews.data) return <div>no reviews</div>

  return (
    <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'}>
      <Title className={totalTitleStyle}>
        You have written {total} review{total === 1 ? '' : 's'}
      </Title>
      <ReviewsList
        reviews={reviews}
        onChangePage={onChangePage}
        totalPages={totalPages}
        showUpdateModal={showUpdateModal}
        user={user}
      />
      {review && review.attributes.product?.data && (
        <ReviewModal
          product={review.attributes.product?.data}
          user={user}
          currentReview={review}
          opened={reviewModalOpened}
          onClose={reviewModal.close}
          onSuccess={onReviewSubmitted}
          willDelete={willDelete}
        />
      )}
    </Group>
  )
}

export default ReviewsContainer
