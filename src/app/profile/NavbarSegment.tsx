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
  IconReceipt2,
  IconSettings,
} from '@tabler/icons-react'
import axios from 'axios'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import NavLinkItem from '@/components/NavLinkItem'
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
    icon: IconReceipt2,
  },
]

const NavbarSegment = ({ user }: NavbarSegmentProps) => {
  const router = useRouter()
  const { colors, defaultRadius, spacing } = useMantineTheme()
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
    if (shouldRedirectToOrders) {
      if (user?.role?.type === 'admin') {
        router.push(ROUTE_PATHS.PROFILE.CUSTOMER_ORDERS)
        setActive('Customer Orders')
      } else {
        router.push(ROUTE_PATHS.PROFILE.ORDERS)
      }
    }
    const isOnGeneralSection =
      !currentPath || pathname.includes('orders') || pathname.includes('reviews')
    setSection(isOnGeneralSection ? 'general' : 'account')
  }, [currentPath, pathname, router, shouldRedirectToOrders])

  const handleLogout = async () => {
    try {
      await axios('/api/auth/logout', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })

      window.location.replace(ROUTE_PATHS.PRODUCT.INDEX)
    } catch (err) {
      console.log(err)
    }
  }

  const links = tabs[section].map((item) => (
    <Link
      key={item.link}
      href={item.link}
      className={link}
      style={{ borderRadius: defaultRadius }}
      data-active={item.label === active || undefined}
      passHref
    >
      <item.icon className={linkIcon} color={isDarkTheme ? 'gray' : 'black'} stroke={1.5} />
      <NavLinkItem
        label={item.label}
        title={item.label}
        href={item.link}
        onClick={() => setActive(item.label)}
        active={false}
        style={{ borderRadius: defaultRadius, backgroundColor: 'transparent' }}
        c={'gray'}
      />
    </Link>
  ))

  const adminLinks = adminTabs.map((item) => (
    <Link
      key={item.link}
      href={item.link}
      className={link}
      style={{ borderRadius: defaultRadius, marginTop: 9 }}
      data-active={item.label === active || undefined}
      passHref
    >
      <item.icon className={linkIcon} color={isDarkTheme ? 'gray' : 'black'} stroke={1.5} />
      <NavLinkItem
        key={item.link}
        label={item.label}
        title={item.label}
        href={item.link}
        onClick={() => setActive(item.label)}
        active={false}
        style={{ borderRadius: defaultRadius, backgroundColor: 'transparent' }}
        c={'gray'}
      />
    </Link>
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
            <Text c={'gray'}>Admins Pages:</Text>
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
        <UserButton user={user} />
        <Button
          className={link}
          onClick={(event) => {
            event.preventDefault()
            handleLogout()
          }}
          variant="subtle"
          c={colors.red[6]}
          style={{ borderColor: colors.red[6] }}
        >
          <IconLogout className={linkIcon} stroke={0.9} color={colors.red[6]} />
          <span>Logout</span>
        </Button>
      </div>
    </Group>
  )
}
{
  /* </> */
}

export default NavbarSegment
