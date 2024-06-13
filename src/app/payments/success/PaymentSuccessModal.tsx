'use client'

import { Button, Center, Flex, Group, Modal, Text, useMantineTheme } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconUser } from '@tabler/icons-react'
import axios from 'axios'
import Link from 'next/link'
import { useEffect } from 'react'

import NavLinkItem from '@/components/NavLinkItem'
// import ToolTip from '@/components/ToolTip'
import { ROUTE_PATHS } from '@/consts/route-paths'
import { Order_NoRelations } from '@/types/Order'

const PaymentSuccessModal: React.FC<{
  defaultOpened?: boolean
  order?: Order_NoRelations
  user?: any
  jwt?: string
}> = ({ defaultOpened, user, order }) => {
  const { colors, defaultRadius } = useMantineTheme()
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
          data: JSON.stringify({
            email: user?.email || order?.user_email || '',
            password: user.password,
            isTempPass: true,
          }),
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
            {!user?.email ? (
              <Text>Log into your profile to view your order</Text>
            ) : user?.email === order?.user_email ? (
              <Text>Go to your profile to view your order details</Text>
            ) : (
              <Text>Log into your profile to view your order</Text>
            )}
          </Center>
        )}
      </Group>
      <Group justify="flex-end" mt={21}>
        <Link
          href={
            isNewUser
              ? ROUTE_PATHS.PROFILE.CHANGE_PASSWORD
              : user?.email === order?.user_email
                ? ROUTE_PATHS.PROFILE.ORDERS
                : ROUTE_PATHS.LOGIN
          }
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: defaultRadius,
            border: `1px solid ${colors.gray[6]}`,
            color: colors.gray[6],
          }}
          data-active={false}
          passHref
        >
          <IconUser color={colors.gray[6]} stroke={1.5} />
          <NavLinkItem
            label={
              isNewUser
                ? 'Go To Profile & Change Password'
                : user?.email === order?.user_email
                  ? 'Your Profile'
                  : 'Login'
            }
            title={
              isNewUser
                ? 'Go to Profile & Change Password'
                : user?.email === order?.user_email
                  ? 'Go to Orders on Profile'
                  : 'Go to Login'
            }
            href={
              isNewUser
                ? ROUTE_PATHS.PROFILE.CHANGE_PASSWORD
                : user?.email === order?.user_email
                  ? ROUTE_PATHS.PROFILE.ORDERS
                  : ROUTE_PATHS.LOGIN
            }
            active={false}
            style={{ borderRadius: defaultRadius, backgroundColor: 'transparent', paddingLeft: 0 }}
            c={'gray'}
          />
        </Link>
        <Button variant="filled" component={Link} href={ROUTE_PATHS.PRODUCT.INDEX}>
          Continue shopping
        </Button>
      </Group>
    </Modal>
    // </ToolTip>
  )
}

export default PaymentSuccessModal
