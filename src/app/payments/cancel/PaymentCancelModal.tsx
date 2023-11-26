'use client'

import { Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/navigation'

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
    <Modal title="Payment Cancelled" opened={opened} onClose={close} centered>
      <Text>Your payment has been cancelled.</Text>
    </Modal>
  )
}

export default PaymentCancelModal
