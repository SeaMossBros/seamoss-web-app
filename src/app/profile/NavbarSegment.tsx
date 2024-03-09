'use client'

import {
  Button,
  Group,
  SegmentedControl,
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
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { AuthUser } from '@/types/Auth'

import { footer, link, linkIcon, navbarMain, navbarStyles } from './navbar-segment.css'
import UserButton from './UserButton'

interface NavbarSegmentProps {
  user: AuthUser
}

const tabs = {
  general: [
    { link: '/orders', label: 'Your Orders', icon: IconLicense },
    { link: '/reviews', label: 'Your Reviews', icon: IconMessage2 },
  ],
  account: [
    // { link: '/notifications', label: 'Notifications', icon: IconBellRinging },
    { link: '/change-password', label: 'Change Password', icon: IconKey },
    { link: '/settings', label: 'Other Settings', icon: IconSettings },
    // { link: '', label: 'Billing', icon: IconReceipt2 }, // * link to Stripe
  ],
}

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
      activeLabel = 'Orders'
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
    if (shouldRedirectToOrders) router.push('/profile/orders')
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

      router.push('/products')
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
        router.push(`/profile${item.link}`)
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
