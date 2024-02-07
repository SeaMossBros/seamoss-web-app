'use client'

import { Button, Menu } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useCallback } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useProfile } from '@/queries/useProfile'
import { logout } from '@/server-actions/logout'

import NavLinkItem from '../NavLinkItem'

interface UserMenuProps {
  isDarkTheme: boolean
}

const UserMenu = ({isDarkTheme}: UserMenuProps) => {
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
        style={{borderRadius: isDarkTheme ? 3 : 9}}
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
