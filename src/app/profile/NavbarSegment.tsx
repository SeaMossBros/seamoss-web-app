'use client'

import {
  Button,
  Divider,
  Group,
  SegmentedControl,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import {
  // IconBellRinging,
  IconKey,
  IconLicense,
  IconLogout,
  IconMessage2,
  IconSettings,
} from '@tabler/icons-react'
import axios from 'axios'
import { PrefetchKind } from 'next/dist/client/components/router-reducer/router-reducer-types'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { AuthUser } from '@/types/Auth'

import { footer, link, linkIcon, navbarMain, navbarStyles } from './navbar-segment.css'
import UserButton from './UserButton'

interface NavbarSegmentProps {
  user: AuthUser
}

const tabs = {
  general: [
    { link: ROUTE_PATHS.PROFILE.ORDERS, label: 'Your Orders', icon: IconLicense },
    { link: ROUTE_PATHS.PROFILE.REVIEWS, label: 'Your Reviews', icon: IconMessage2 },
  ],
  account: [
    // { link: '/notifications', label: 'Notifications', icon: IconBellRinging },
    { link: ROUTE_PATHS.PROFILE.CHANGE_PASSWORD, label: 'Change Password', icon: IconKey },
    { link: ROUTE_PATHS.PROFILE.SETTINGS, label: 'Other Settings', icon: IconSettings },
    // { link: '', label: 'Billing', icon: IconReceipt2 }, // * link to Stripe
  ],
}

const adminTabs = [
  {
    link: ROUTE_PATHS.PROFILE.CUSTOMER_ORDERS,
    label: 'Customer Orders',
    icon: IconLicense,
  },
]

const NavbarSegment = ({ user }: NavbarSegmentProps) => {
  const router = useRouter()
  const { defaultRadius, spacing } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const [section, setSection] = useState<'account' | 'general'>('general')

  const pathname = usePathname()
  const currentPath = pathname.split('/')[2]
  let shouldRedirectToOrders = false
  let activeLabel = ''
  switch (currentPath) {
    case 'orders':
      activeLabel = 'Your Orders'
      break

    case 'customer-orders':
      activeLabel = 'Customer Orders'
      break

    case 'reviews':
      activeLabel = 'Your Reviews'
      break

    case 'notifications':
      activeLabel = 'Notifications'
      break

    case 'change-password':
      activeLabel = 'Change Password'
      break

    case 'settings':
      activeLabel = 'Other Settings'
      break

    default:
      shouldRedirectToOrders = true
      break
  }
  const [active, setActive] = useState(activeLabel)

  useEffect(() => {
    if (shouldRedirectToOrders) router.push(ROUTE_PATHS.PROFILE.ORDERS)
    const isOnGeneralSection =
      !currentPath || pathname.includes('orders') || pathname.includes('reviews')
    setSection(isOnGeneralSection ? 'general' : 'account')
  }, [currentPath, pathname, router, shouldRedirectToOrders])

  const handleLogout = async () => {
    try {
      router.prefetch(ROUTE_PATHS.PRODUCT.INDEX, { kind: PrefetchKind.FULL })
      await axios('/api/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      router.push(ROUTE_PATHS.PRODUCT.INDEX)
    } catch (err) {
      console.log(err)
    }
  }

  const links = tabs[section].map((item) => (
    <Button
      key={item.link}
      variant="outline"
      size="md"
      mt="xl"
      className={link}
      data-active={item.label === active || undefined}
      style={{ borderRadius: defaultRadius }}
      c="gray"
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
        router.push(item.link)
      }}
    >
      <item.icon className={linkIcon} color={isDarkTheme ? 'gray' : 'black'} stroke={1.5} />
      {item.label}
    </Button>
  ))

  const adminLinks = adminTabs.map((item) => (
    <Button
      key={item.link}
      variant="outline"
      size="md"
      mt="xl"
      className={link}
      data-active={item.label === active || undefined}
      style={{ borderRadius: defaultRadius }}
      c="gray"
      onClick={(event) => {
        event.preventDefault()
        setActive(item.label)
        router.push(item.link)
      }}
    >
      <item.icon className={linkIcon} color={isDarkTheme ? 'gray' : 'black'} stroke={1.5} />
      {item.label}
    </Button>
  ))

  return (
    <Group
      className={navbarStyles}
      w={'300px'}
      px={spacing.md}
      pt={spacing.md}
      style={{ borderBottomLeftRadius: defaultRadius, borderBottomRightRadius: defaultRadius }}
    >
      <br />
      {user?.role?.type === 'admin' && (
        <>
          <div className={navbarMain}>
            <Text c={'gray'}>Links for Admins:</Text>
            {adminLinks}
          </div>
          <Divider w={'100%'} my={9} />
        </>
      )}
      <SegmentedControl
        value={section}
        onChange={(value: any) => setSection(value)}
        transitionTimingFunction="ease"
        fullWidth
        data={[
          { label: 'General', value: 'general' },
          { label: 'Account', value: 'account' },
        ]}
        w={'100%'}
      />
      <div className={navbarMain}>{links}</div>
      <div className={footer}>
        <Button
          className={link}
          onClick={(event) => {
            event.preventDefault()
            handleLogout()
          }}
          variant="subtle"
        >
          <IconLogout className={linkIcon} stroke={0.9} color={isDarkTheme ? 'gray' : 'black'} />
          <span>Logout</span>
        </Button>
      </div>
      <UserButton user={user} />
    </Group>
  )
}
{
  /* </> */
}

export default NavbarSegment
