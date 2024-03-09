import {
  Box,
  Button,
  Card,
  Flex,
  Image,
  Skeleton,
  Stack,
  Text,
  useMantineColorScheme,
} from '@mantine/core'
import isNil from 'lodash/isNil'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

import { formatPrice } from '@/utils/price'

export type BillingDetailProps = {
  total: number | null
  onCheckout: () => void
  isCheckingOut: boolean
}

const BillingDetail: React.FC<BillingDetailProps> = ({ total, onCheckout, isCheckingOut }) => {
  const router = useRouter()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const onCheckoutClick = useCallback(() => {
    onCheckout()
  }, [onCheckout])

  return (
    <Card withBorder>
      <Stack gap="lg">
        <Box display={'flex'} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text c="gray" mr={9}>
            Subtotal:
          </Text>
          <Skeleton visible={isNil(total)}>
            <Text fz="xl" fw={700} c="teal">
              {formatPrice(total)}
            </Text>
          </Skeleton>
        </Box>
        <Button
          loading={isCheckingOut}
          onClick={onCheckoutClick}
          fullWidth
          disabled={!total || total === 0}
          style={{ border: !total || total === 0 ? '1px solid #373a40' : '' }}
        >
          CHECKOUT
        </Button>
        <Text fw={300} fz={9}>
          Taxes & Shipping fees not included
        </Text>
        <Flex align={'center'}>
          <Text fw={200} fz={'xs'} mr={6}>
            powered by
          </Text>
          <Image
            src={`/images/icons8-stripe-${isDarkTheme ? '64' : '50'}.png`}
            w={33}
            onClick={() => router.push('https://stripe.com')}
            style={{ cursor: 'pointer' }}
          />
        </Flex>
      </Stack>
    </Card>
  )
}

export default BillingDetail
