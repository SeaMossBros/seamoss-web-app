'use client'

import { Button, Center, Flex, Pagination, Rating, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { useCallback, useMemo, useState } from 'react'

import { useProductReviews } from '@/queries/useProductReviews'
import { Product } from '@/types/Product'
import { PaginationOptions } from '@/types/QueryParams'

import ReviewModal from '../ReviewModal'
import { reviewSummary } from './ProductReviews.css'
import ReviewItem from './ReviewItem'

export type ProductReviewsProps = {
  product: Product
  onRefetch: () => void
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product, onRefetch }) => {
  const [reviewModalOpened, reviewModal] = useDisclosure()
  const [pagination, setPagination] = useState<Pick<PaginationOptions, 'page' | 'pageSize'>>({
    page: 1,
    pageSize: 10,
  })

  const { data: reviews, refetch: refetchReviews } = useProductReviews(
    {
      filters: {
        product: product.id,
      },
      fields: ['id', 'rating', 'user_name', 'comment'],
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
    const _total = reviews?.meta.pagination.total ?? 0

    const _totalPages = Math.ceil(_total / (pagination.pageSize ?? 10))

    return {
      total: _total,
      totalPages: _totalPages,
    }
  }, [pagination.pageSize, reviews?.meta.pagination.total])

  const onChangePage = useCallback((_page: number) => {
    setPagination((prev) => ({
      ...prev,
      page: _page,
    }))
  }, [])

  const onReviewSubmitted = useCallback(() => {
    reviewModal.close()
    refetchReviews()
    setTimeout(() => {
      onRefetch?.()
    }, 500)
  }, [onRefetch, refetchReviews, reviewModal])

  return (
    <Stack gap={0}>
      <Title order={3}>Customer Reviews</Title>
      <Flex className={reviewSummary} align="center" justify="space-between">
        <Stack w={120}>
          <Text component="p" fz={32} fw="bold" ta="center">
            {product.attributes.rating ?? 0}
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
          <Button variant="outline" onClick={reviewModal.open}>
            Write a review
          </Button>
        </Flex>
      </Flex>
      <Stack gap={0}>
        {reviews?.data?.map((review) => <ReviewItem key={review.id} review={review} />)}
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
        opened={reviewModalOpened}
        onClose={reviewModal.close}
        onSuccess={onReviewSubmitted}
      />
    </Stack>
  )
}

export default ProductReviews
