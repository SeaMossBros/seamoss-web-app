import {
  Anchor,
  Box,
  Button,
  Flex,
  Image,
  Rating,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { Media } from '@/types/Media'
import { ProductReview } from '@/types/ProductReview'
import { getStrapiUploadUrl } from '@/utils/cms'

import { reviewHeader, reviewIndexStyle, reviewItem } from './ProductReviews.css'

export type ReviewItemProps = {
  review: ProductReview
  isOnProfile?: boolean
  showUpdateModal: (review: ProductReview | null, willDelete?: true) => void
  isCurrentUsersReview: boolean
  reviewIndex: number
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  review,
  isOnProfile,
  showUpdateModal,
  isCurrentUsersReview,
  reviewIndex,
}) => {
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const router = useRouter()
  const isUsersReview = !!isOnProfile || isCurrentUsersReview
  const [isHovering, setIsHovering] = useState(false)
  const { colors } = useMantineTheme()
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

  const productUrl = ROUTE_PATHS.PRODUCT.SLUG.replace(
    '{slug}',
    review.attributes.product?.data?.attributes.slug || '',
  )

  if ((!review.attributes.product || !review.attributes.product.data) && isOnProfile) {
    // product is not in db (or is not published)
    return (
      <Stack
        className={reviewItem}
        gap="xs"
        style={{
          borderBottomColor: isOnProfile && isHovering ? colors.teal[9] : '',
          transition: '0.24s ease-in-out',
          alignItems: isOnProfile ? 'center' : 'flex-start',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Box w={isOnProfile ? '81%' : '100%'}>
          <Flex className={reviewHeader} direction={'column'} align={'flex-start'}>
            <Text fz={'md'} ff="fantasy">
              review {reviewIndex + 1}:
            </Text>
            <Text fz={'sm'}>
              Product is No longer Available. Please Contact Support for the product information.
            </Text>
            <Anchor fz={'sm'} type="email" c={'blue'} underline="always">
              support@seathemoss.com
            </Anchor>
          </Flex>
        </Box>
      </Stack>
    )
  }

  return (
    <Stack
      className={reviewItem}
      gap="xs"
      style={{
        borderBottomColor: isOnProfile && isHovering ? colors.teal[9] : '',
        transition: '0.24s ease-in-out',
        alignItems: isOnProfile ? 'center' : 'flex-start',
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Box w={'100%'}>
        {isOnProfile && (
          <>
            <Flex className={reviewHeader}>
              <Text fz={'md'} ff="fantasy" className={reviewIndexStyle}>
                review {reviewIndex + 1}:
              </Text>
              <Text fw={200} fz={'sm'} mb={12}>
                {review.attributes.createdAt === review.attributes.updatedAt
                  ? 'Created On'
                  : 'Last Updated'}
                :{' '}
                {new Date(review.attributes.updatedAt).toLocaleDateString(undefined, {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                })}
              </Text>
              <Flex direction={'column'}>
                <Button mb={12} onClick={() => showUpdateModal(review || null)}>
                  Update Review
                </Button>
                <Button mb={12} bg={'red'} onClick={() => showUpdateModal(review || null, true)}>
                  Delete Your Review
                </Button>
              </Flex>
            </Flex>
          </>
        )}
        <Rating value={review.attributes.rating} size="xs" readOnly fractions={2} />
        {!isOnProfile && (
          <Text fw={600} fz="sm" mt={4}>
            {review.attributes.user_name}
          </Text>
        )}
        <div className="media">
          {files.length > 0 && files.map((file, i) => <div key={i}>{getFileElement(file)}</div>)}
        </div>
      </Box>
      <Text w={'100%'}>{review.attributes.comment}</Text>
      {isOnProfile && (
        <Flex align={'flex-end'}>
          <Image
            src={
              review.attributes.product?.data.attributes.thumbnail?.data.attributes.url
                ? getStrapiUploadUrl(
                    review.attributes.product?.data.attributes.thumbnail?.data.attributes.url,
                  )
                : ''
            }
            alt={review.attributes.product?.data.attributes.name}
            h={'100px'}
            w={'auto'}
            onClick={() => router.push(productUrl)}
            style={{ cursor: 'pointer' }}
            mr={9}
            mb={9}
          />
          <Anchor
            fz={'sm'}
            w={'100%'}
            maw={210}
            href={productUrl}
            c={isDarkTheme ? 'lightgray' : 'gray'}
          >
            {review.attributes.product?.data.attributes.name}
          </Anchor>
        </Flex>
      )}
      {!isOnProfile && isUsersReview && (
        <Flex direction={'column'}>
          <Button my={12} onClick={() => showUpdateModal(review || null)}>
            Update Your Review
          </Button>
          <Button
            mb={12}
            c={colors.red[9]}
            onClick={() => showUpdateModal(review || null, true)}
            variant="outline"
            style={{ borderColor: colors.red[9] }}
          >
            Delete Your Review
          </Button>
        </Flex>
      )}
    </Stack>
  )
}

export default ReviewItem
