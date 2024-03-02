'use client'

import { Button, Group, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { Order_NoRelations } from '@/types/Order'
import ToolTip from '@/components/ToolTip'
import { useEffect } from 'react'
import axios from 'axios'

const PaymentSuccessModal: React.FC<{
  defaultOpened?: boolean
  order: Order_NoRelations
  user?: any
  jwt?: string
}> = ({ defaultOpened, order, user }) => {
  const [opened, { close }] = useDisclosure(defaultOpened)
  const isNewUser = !!(user && user.role)

  useEffect(() => {
    const loginUserWithTempPassword = async () => {
      if (user && user.id) {
        // login user
        console.log('user in success modal', user);
        await axios('/api/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ email: user.email, password: user.password })
        })
      }
    }

    isNewUser && loginUserWithTempPassword();
  }, [])

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
        <Group display={'flex'} style={{ flexDirection: 'column' }}>
          <Text>Your payment has been received. Thank you for your purchase!</Text>
          <br/>
        {isNewUser && (
          <>
            <Text>We went ahead and created a profile for you with the email you used on stripe.</Text>
            <Text>Visit your profile to reset your password!</Text>
          </>
        )}
        </Group>
        {isNewUser && <br/>}
        <Group justify="flex-end" mt={15}>
          <Button variant='outline' component={Link} href={isNewUser ? ROUTE_PATHS.PROFILE.ORDERS : ROUTE_PATHS.LOGIN}>
            {isNewUser ? (
              'View Order on Profile'
              ) : (
              'Login to View Order on Profile'
            )}
          </Button>
          <Button variant="filled" component={Link} href={ROUTE_PATHS.PRODUCT.INDEX}>
            Continue shopping
          </Button>
        </Group>
      </Modal>
    // </ToolTip>
  )
}

export default PaymentSuccessModal
