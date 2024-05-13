'use client'

import { Button, Center, Flex, Pagination, Rating, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { useProductReviews } from '@/queries/useProductReviews'
import { AuthUser } from '@/types/Auth'
import { Product } from '@/types/Product'
import { ProductReview } from '@/types/ProductReview'
import { PaginationOptions } from '@/types/QueryParams'

import ReviewModal from '../ReviewModal'
import { reviewSummary } from './ProductReviews.css'
import ReviewItem from './ReviewItem'

export type ProductReviewsProps = {
  product: Product
  onRefetch: () => void
  user: AuthUser | null
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product, onRefetch, user }) => {
  const id = 'product-reviews'
  const [review, setReview] = useState<ProductReview | null>(null)
  const [willDelete, setWillDelete] = useState(false)
  const [shouldShowReviewModal, setShouldShowReviewModal] = useState(false)
  const searchParams = useSearchParams()
  const [reviewModalOpened, reviewModal] = useDisclosure()
  const [pagination, setPagination] = useState<Pick<PaginationOptions, 'page' | 'pageSize'>>({
    page: 1,
    pageSize: 5,
  })

  const { data: reviews, refetch: refetchReviews } = useProductReviews(
    {
      filters: {
        product: product.id,
      },
      pagination: {
        withCount: true,
        ...pagination,
      },
    },
    {
      enabled: Boolean(product.id),
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
      onRefetch?.()
    }, 500)
  }, [onRefetch, refetchReviews, reviewModal])

  useLayoutEffect(() => {
    if (!!searchParams.get('showReviewModal')) {
      setShouldShowReviewModal(true)
    }
  }, [])

  useEffect(() => {
    if (shouldShowReviewModal) {
      reviewModal.open()
    }
  }, [shouldShowReviewModal])

  useEffect(() => {
    setTimeout(() => {
      const productReviewsEle = document.getElementById(id)
      if (reviewModalOpened && productReviewsEle) {
        productReviewsEle.scrollIntoView({ behavior: 'smooth' })
      }
    }, 120)
  }, [reviewModalOpened])

  const showUpdateModal = (review: ProductReview | null, willDelete: boolean = false) => {
    if (review) {
      setReview(review)
      setWillDelete(willDelete)
      reviewModal.open()
    }
  }

  if (!reviews || !reviews.meta) return null

  return (
    <Stack gap={0} id={id}>
      <Title order={3}>Customer Reviews</Title>
      <Flex className={reviewSummary} align="center" justify="space-between">
        <Stack w={120}>
          <Text component="p" fz={32} fw="bold" ta="center">
            {product.attributes.rating?.toFixed(2) ?? 0}
          </Text>
          <Stack gap="xs">
            <Center>
              <Rating value={product.attributes.rating ?? 0} fractions={100} size="md" readOnly />
            </Center>
            <Center>
              <Text fz="sm">{total} reviews</Text>
            </Center>
          </Stack>
        </Stack>
        <Flex justify="flex-end">
          {/* // TODO: Only allow logged in users to write a review. Otherwise instruct them to log in first. *this way only people who have purchased an item (or made an account) can leave reviews* */}
          {/* // TODO: Put on Forgot Password Page -> If they are unsure if they have an account, let them know every person who has purchased a product has an account, just click forgot password if they do not remember and look through their emails and search for `seathemoss` to see if we sent them any mail previously */}
          <Button onClick={reviewModal.open}>Write a review</Button>
        </Flex>
      </Flex>
      <Stack gap={0}>
        {reviews?.data?.map((review, reviewIndex) => (
          <ReviewItem
            key={review.id}
            reviewIndex={reviewIndex}
            review={review}
            showUpdateModal={showUpdateModal}
            isCurrentUsersReview={review.attributes.user_email === user?.email}
          />
        ))}
      </Stack>
      <Center mt="xl">
        <Pagination
          total={totalPages}
          value={reviews?.meta.pagination.page}
          onChange={onChangePage}
        />
      </Center>
      <ReviewModal
        product={product}
        user={user}
        opened={reviewModalOpened}
        onClose={reviewModal.close}
        onSuccess={onReviewSubmitted}
        willDelete={willDelete}
        currentReview={review}
      />
    </Stack>
  )
}

export default ProductReviews
