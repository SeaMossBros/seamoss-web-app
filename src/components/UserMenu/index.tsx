'use client'

import { Button, Menu } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useProfile } from '@/queries/useProfile'
import { logout } from '@/server-actions/logout'

import NavLinkItem from '../NavLinkItem'

const UserMenu: React.FC = () => {
  const pathname = usePathname()
  const { data: user, refetch: refreshSession } = useProfile()

  const onLogout = useCallback(async () => {
    await logout()
    refreshSession()
  }, [refreshSession])

  if (!user)
    return (
      <NavLinkItem
        label="Login"
        href={ROUTE_PATHS.LOGIN}
        active={pathname.startsWith(ROUTE_PATHS.LOGIN)}
      />
    )

  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <Button variant="subtle" rightSection={<IconChevronDown size={14} />}>
          {user.username}
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item fz="md" onClick={onLogout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default UserMenu
