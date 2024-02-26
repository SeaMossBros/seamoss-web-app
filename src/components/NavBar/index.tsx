import { Stack, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { usePathname } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'

import ColorSchemeToggler from '../ColorSchemeToggler'
import NavLinkItem from '../NavLinkItem'
import { navLink } from './NavBar.css'
import UserMenu from '../UserMenu'

export type NavBarProps = {
  onClose: () => void
}

const NavBar: React.FC<NavBarProps> = ({ onClose }) => {
  const pathname = usePathname();
  const { colors, defaultRadius } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <Stack 
      w="100%"
      pb={9} 
      bg={isDarkTheme ? colors.black[9] : '#f5f5f5'} 
    >
      <NavLinkItem
        className={navLink}
        label="Home"
        href={ROUTE_PATHS.HOME}
        active={pathname === '' || pathname === '/'}
        onClick={onClose}
        style={{borderRadius: defaultRadius}}
      />
      <NavLinkItem
        className={navLink}
        label="Products"
        href={ROUTE_PATHS.PRODUCT.INDEX}
        active={pathname.startsWith(ROUTE_PATHS.PRODUCT.INDEX)}
        onClick={onClose}
        style={{borderRadius: defaultRadius}}
      />
      <NavLinkItem
        className={navLink}
        label="Support"
        href={ROUTE_PATHS.SUPPORT}
        active={pathname.startsWith(ROUTE_PATHS.SUPPORT)}
        onClick={onClose}
        style={{borderRadius: defaultRadius}}
      />
      <NavLinkItem
        className={navLink}
        label="Blogs"
        href={ROUTE_PATHS.BLOG.INDEX}
        active={pathname.startsWith(ROUTE_PATHS.BLOG.INDEX)}
        onClick={onClose}
        style={{borderRadius: defaultRadius}}
      />
      <NavLinkItem
        className={navLink}
        label="About us"
        href={ROUTE_PATHS.ABOUT}
        active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
        onClick={onClose}
        style={{borderRadius: defaultRadius}}
      />
      <UserMenu/> 
      <ColorSchemeToggler />
    </Stack>
  )
}

export default NavBar
