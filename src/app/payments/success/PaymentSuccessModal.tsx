'use client'

import { Button, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { Order_NoRelations } from '@/types/Order'
import ToolTip from '@/components/ToolTip'

const PaymentSuccessModal: React.FC<{
  defaultOpened?: boolean
  order: Order_NoRelations
}> = ({ defaultOpened }) => {
  const [opened, { close }] = useDisclosure(defaultOpened)

  return (
    // <ToolTip title="Payment Success!">
      <Modal
        opened={opened}
        onClose={close}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        centered
      >
        <Text>Your payment has been received. Thank you for your purchase!</Text>

        <Group justify="flex-end" mt={15}>
          <Button variant="filled" component={Link} href={ROUTE_PATHS.PRODUCT.INDEX}>
            Continue shopping
          </Button>
        </Group>
      </Modal>
    // </ToolTip>
  )
}

export default PaymentSuccessModal
