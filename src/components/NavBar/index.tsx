import { ActionIcon, Stack, useMantineColorScheme } from '@mantine/core'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MoonStars, Sun } from 'tabler-icons-react'

import { ROUTE_PATHS } from '@/consts/route-paths'

import NavLinkItem from '../NavLinkItem'
import { navLink } from './NavBar.css'

export type NavBarProps = {
  onClose: () => void
}

const NavBar: React.FC<NavBarProps> = ({ onClose }) => {
  const pathname = usePathname()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'

  return (
    <Stack w="100%" h="100vh">
      <NavLinkItem
        className={navLink}
        label="Home"
        href={ROUTE_PATHS.HOME}
        active={pathname === '' || pathname === '/'}
        onClick={onClose}
      />
      <NavLinkItem
        className={navLink}
        label="Products"
        href={ROUTE_PATHS.PRODUCT.INDEX}
        active={pathname.startsWith(ROUTE_PATHS.PRODUCT.INDEX)}
        onClick={onClose}
      />
      <NavLinkItem
        className={navLink}
        label="Support"
        href={ROUTE_PATHS.SUPPORT}
        active={pathname.startsWith(ROUTE_PATHS.SUPPORT)}
        onClick={onClose}
      />
      <NavLinkItem
        className={navLink}
        label="Blogs"
        href={ROUTE_PATHS.BLOG.INEDX}
        active={pathname.startsWith(ROUTE_PATHS.BLOG.INEDX)}
        onClick={onClose}
      />
      <NavLinkItem
        className={navLink}
        label="About us"
        href={ROUTE_PATHS.ABOUT}
        active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
        onClick={onClose}
      />
      <div>Theme</div>
      <ActionIcon
        variant="outline"
        color={isDarkTheme ? 'yellow' : 'blue'}
        onClick={() => toggleColorScheme()}
        title="Toggle color scheme"
      >
        {isDarkTheme ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    </Stack>
  )
}

export default NavBar
