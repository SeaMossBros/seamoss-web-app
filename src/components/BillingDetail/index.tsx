import { Box, Button, Card, Skeleton, Stack, Text } from '@mantine/core'
import isNil from 'lodash/isNil'

import { formatPrice } from '@/utils/price'

export type BillingDetailProps = {
  total: number | null
}

const BillingDetail: React.FC<BillingDetailProps> = ({ total }) => {
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
        <Button fullWidth>CHECKOUT</Button>
      </Stack>
    </Card>
  )
}

export default BillingDetail
