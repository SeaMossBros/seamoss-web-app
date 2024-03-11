'use client'

import { Button, Flex, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// import ToolTip from '@/components/ToolTip'
import { ROUTE_PATHS } from '@/consts/route-paths'

const PaymentCancelModal: React.FC<{
  defaultOpened?: boolean
}> = ({ defaultOpened }) => {
  const router = useRouter()

  const [opened, { close }] = useDisclosure(defaultOpened, {
    onClose: () => {
      router.replace(ROUTE_PATHS.CART)
    },
  })

  return (
    // <ToolTip title="Payment Cancelled">
    <Modal opened={opened} onClose={close} centered>
      <Flex px={33} pb={33} direction={'column'} align={'center'}>
        <Text fw={700} fz={24} mb={12} c={'red'}>
          Order Cancelled
        </Text>
        <Text fw={400} fz={'md'}>
          Your payment was not processed.
        </Text>
        <Group justify="center" mt={21}>
          <Button variant="outline" component={Link} href={ROUTE_PATHS.CART} w={'81%'}>
            Go Back To Cart
          </Button>
          <Button variant="filled" w={'81%'} component={Link} href={ROUTE_PATHS.PRODUCT.INDEX}>
            Continue shopping
          </Button>
        </Group>
      </Flex>
    </Modal>
    // </ToolTip>
  )
}

export default PaymentCancelModal
