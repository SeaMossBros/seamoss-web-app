import { Box, Button, Card, Skeleton, Stack, Text } from '@mantine/core'
import isNil from 'lodash/isNil'
import { useCallback } from 'react'

import { formatPrice } from '@/utils/price'

export type BillingDetailProps = {
  total: number | null
  onCheckout: () => void
  isCheckingOut: boolean
}

const BillingDetail: React.FC<BillingDetailProps> = ({ total, onCheckout, isCheckingOut }) => {
  const onCheckoutClick = useCallback(() => {
    onCheckout()
  }, [onCheckout])

  return (
    <Card withBorder>
      <Stack gap="lg">
        <Box>
          <Text c="primary-gray">Subtotal:</Text>
          <Skeleton visible={isNil(total)}>
            <Text fz="xl" fw={700} c="primary-green">
              {formatPrice(total)}
            </Text>
          </Skeleton>
        </Box>
        <Button loading={isCheckingOut} onClick={onCheckoutClick} fullWidth>
          CHECKOUT
        </Button>
      </Stack>
    </Card>
  )
}

export default BillingDetail
