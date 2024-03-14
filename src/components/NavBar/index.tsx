import { Group, Stack, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { usePathname } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'

import ColorSchemeToggler from '../ColorSchemeToggler'
import NavLinkItem from '../NavLinkItem'
import UserMenu from '../UserMenu'
import { navLink, navLinkContClosed, navLinkContOpened } from './NavBar.css'

export type NavBarProps = {
  onClose: () => void
  navOpened: boolean
}

const NavBar: React.FC<NavBarProps> = ({ onClose, navOpened }) => {
  const pathname = usePathname()
  const { colors, defaultRadius } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'

  return (
    <Stack
      w="100%"
      p={12}
      bg={isDarkTheme ? colors.dark[8] : '#f5f5f5'}
      className={navOpened ? navLinkContOpened : navLinkContClosed}
    >
      <NavLinkItem
        className={navLink}
        label="Home"
        title="Home"
        href={ROUTE_PATHS.HOME}
        active={pathname === '' || pathname === '/'}
        onClick={onClose}
        style={{ borderRadius: defaultRadius }}
      />
      <NavLinkItem
        className={navLink}
        label="Products"
        title="Products"
        href={ROUTE_PATHS.PRODUCT.INDEX}
        active={pathname.startsWith(ROUTE_PATHS.PRODUCT.INDEX)}
        onClick={onClose}
        style={{ borderRadius: defaultRadius }}
      />
      <NavLinkItem
        className={navLink}
        label="Blogs"
        title="Blogs"
        href={ROUTE_PATHS.BLOG.INDEX}
        active={pathname.startsWith(ROUTE_PATHS.BLOG.INDEX)}
        onClick={onClose}
        style={{ borderRadius: defaultRadius }}
      />
      <NavLinkItem
        className={navLink}
        label="About us"
        title="About us"
        href={ROUTE_PATHS.ABOUT}
        active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
        onClick={onClose}
        style={{ borderRadius: defaultRadius }}
      />
      <NavLinkItem
        className={navLink}
        label="Support"
        title="Support"
        href={ROUTE_PATHS.SUPPORT}
        active={pathname.startsWith(ROUTE_PATHS.SUPPORT)}
        onClick={onClose}
        style={{ borderRadius: defaultRadius }}
      />
      <UserMenu onClick={onClose} navOpened={navOpened} />
      <Group w={'93%'} display={'flex'} style={{ flexDirection: 'column', alignItems: 'center' }}>
        <ColorSchemeToggler />
        <Text
          onClick={onClose}
          style={{
            cursor: 'pointer',
            border: '1px solid #bc2727',
            borderRadius: defaultRadius,
            textAlign: 'center',
            alignSelf: 'flex-end',
          }}
          c={'#bc2727'}
          py={3}
          pl={9}
          pr={10}
          mr={-12}
        >
          {'<'} close
        </Text>
      </Group>
    </Stack>
  )
}

export default NavBar
