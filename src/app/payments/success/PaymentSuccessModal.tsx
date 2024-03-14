'use client'

import { Button, Center, Flex, Group, Modal, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import axios from 'axios'
import Link from 'next/link'
import { useEffect } from 'react'

// import ToolTip from '@/components/ToolTip'
import { ROUTE_PATHS } from '@/consts/route-paths'
import { Order_NoRelations } from '@/types/Order'

const PaymentSuccessModal: React.FC<{
  defaultOpened?: boolean
  order?: Order_NoRelations
  user?: any
  jwt?: string
}> = ({ defaultOpened, user, order }) => {
  const { colors } = useMantineTheme()
  const [opened, { close }] = useDisclosure(defaultOpened)
  const isNewUser = !!(user && user.role)

  useEffect(() => {
    const loginUserWithTempPassword = async () => {
      if (user && user.id) {
        // login user
        await axios('/api/auth/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          data: JSON.stringify({ email: user.email, password: user.password, isTempPass: true }),
        })
      }
    }

    isNewUser && loginUserWithTempPassword()
  }, [isNewUser, user])

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
        <Flex
          w={'100%'}
          direction={'column'}
          align={'center'}
          style={{ borderBottom: `2px double ${colors.teal[9]}` }}
          pb={9}
        >
          <Text>Your payment has been received.</Text>
          <Text>Thank you for your purchase!</Text>
        </Flex>
        {isNewUser ? (
          <Flex w={'100%'} direction={'column'} mt={12}>
            <Text>The email you used to checkout on stripe is new to us.</Text>
            <Text c={colors.teal[9]} mb={12}>
              We created a profile for you...
            </Text>
            {order?.user_email && user?.password && (
              <>
                <Text pl={12}>
                  Email:{' '}
                  <Text c={'gray'} span>
                    {order.user_email.toLowerCase()}
                  </Text>
                </Text>
                <Text pl={12}>
                  Temporary Password:{' '}
                  <Text c={'gray'} span>
                    ************
                  </Text>
                </Text>
              </>
            )}
            <Text c={'red'} mt={33} mb={9}>
              It is not recommended to keep the temporary password. Choose an option to secure your
              account:
            </Text>
            <Text>1. Visit your new profile and reset the temporary password.</Text>
            <Text mb={21}>
              2. Or, if you choose not to reset your password at this time, you can always click
              `Profile` then `forgot password` to send a link to your email.
            </Text>
          </Flex>
        ) : (
          <Center w={'100%'} mt={12}>
            <Text>Log in to your profile to view your order</Text>
          </Center>
        )}
      </Group>
      <Group justify="flex-end" mt={21}>
        <Button
          variant="outline"
          component={Link}
          href={isNewUser ? ROUTE_PATHS.PROFILE.CHANGE_PASSWORD : ROUTE_PATHS.LOGIN}
        >
          {isNewUser ? 'Go To Profile & Reset Password' : 'Login'}
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
