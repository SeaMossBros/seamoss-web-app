'use client'

import { Box, Button, Center, Flex, Rating, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { useCallback, useState } from 'react'

import { useProductReviews } from '@/queries/useProductReviews'
import { Product } from '@/types/Product'
import { PaginationOptions } from '@/types/QueryParams'

import ReviewModal from '../ReviewModal'

export type ProductReviewsProps = {
  product: Product
  onRefetch: () => void
}

const ProductReviews: React.FC<ProductReviewsProps> = ({ product, onRefetch }) => {
  const [reviewModalOpened, reviewModal] = useDisclosure()
  const [pagination] = useState<Pick<PaginationOptions, 'page' | 'pageSize'>>({
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

  const totalReviews = reviews?.meta.pagination.total ?? 0

  const onReviewSubmitted = useCallback(() => {
    reviewModal.close()
    refetchReviews()
    setTimeout(() => {
      onRefetch?.()
    }, 500)
  }, [onRefetch, refetchReviews, reviewModal])

  return (
    <Box>
      <Title order={3}>Customer Reviews</Title>
      <Flex align="center" justify="space-between">
        <Stack w={120}>
          <Text component="p" fz={32} fw="bold" ta="center">
            {product.attributes.rating ?? 0}
          </Text>
          <Stack gap="xs">
            <Center>
              <Rating value={product.attributes.rating ?? 0} fractions={100} size="md" readOnly />
            </Center>
            <Center>
              <Text fz="sm">{totalReviews} reviews</Text>
            </Center>
          </Stack>
        </Stack>
        <Flex justify="flex-end">
          <Button variant="outline" onClick={reviewModal.open}>
            Write a review
          </Button>
        </Flex>
      </Flex>
      <ReviewModal
        product={product}
        opened={reviewModalOpened}
        onClose={reviewModal.close}
        onSuccess={onReviewSubmitted}
      />
    </Box>
  )
}

export default ProductReviews
