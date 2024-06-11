import { Flex, Group, Stack, Text, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { AuthUser } from '@/types/Auth'

import ColorSchemeToggler from '../ColorSchemeToggler'
import NavLinkItem from '../NavLinkItem'
import { navLink, navLinkContClosed, navLinkContOpened } from './NavBar.css'

const LogoutBtnClientSide = dynamic(() => import('../LogoutBtn'), { ssr: false })

export type NavBarProps = {
  onClose: () => void
  navOpened: boolean
  user: AuthUser | null
}

const NavBar: React.FC<NavBarProps> = ({ onClose, navOpened, user }) => {
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
        label="About Us"
        title="About Us"
        href={ROUTE_PATHS.ABOUT}
        active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
        onClick={onClose}
        style={{ borderRadius: defaultRadius, display: 'flex', flexWrap: 'nowrap' }}
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
      <NavLinkItem
        label="Profile"
        title={'Visit Your Profile'}
        href={ROUTE_PATHS.PROFILE.INDEX}
        active={pathname.startsWith(ROUTE_PATHS.PROFILE.INDEX)}
        style={{ borderRadius: defaultRadius }}
        onClick={onClose}
        className={navOpened ? navLink : ''}
        w={navOpened ? '100%' : 'fit-content'}
      />
      <Group w={'93%'} display={'flex'} style={{ flexDirection: 'column', alignItems: 'center' }}>
        <Flex w={'100%'} justify={'center'} wrap={'nowrap'} p={0} m={0}>
          <LogoutBtnClientSide user={user} />
          <div style={{ width: '21px' }}></div>
          <ColorSchemeToggler />
        </Flex>
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
          X close
        </Text>
      </Group>
    </Stack>
  )
}

export default NavBar
