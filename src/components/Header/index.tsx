'use client'
import {
  ActionIcon,
  Burger,
  Container,
  Flex,
  Group,
  Image,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { spotlight } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { AuthUser } from '@/types/Auth'

import CartDropdown from '../CartNavLink'
import ColorSchemeToggler from '../ColorSchemeToggler'
import NavLinkItem from '../NavLinkItem'
// import ToolTip from '../ToolTip'
import { appTitle, container, logoContainer, navLinkContainer, wrapper } from './Header.css'

const LogoutBtnClientSide = dynamic(() => import('../LogoutBtn'), { ssr: false })

export type HeaderProps = {
  navOpened: boolean
  toggleNav: () => void
  user: AuthUser | null
}

const Header: React.FC<HeaderProps> = ({ navOpened, toggleNav, user }) => {
  const pathname = usePathname()
  const { primaryColor, defaultRadius } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'

  return (
    <Container className={container}>
      <Group className={wrapper} justify="space-between" align="center">
        <Link href={ROUTE_PATHS.HOME} className={logoContainer}>
          <Image src="/images/SeaTheMoss-Empty-Icon.png" alt="Logo" height={40} />
          <Title c={primaryColor} order={2} visibleFrom="sm" className={appTitle}>
            SeaTheMoss
          </Title>
        </Link>

        <Flex visibleFrom="md" className={navLinkContainer} gap="md" align="center">
          <NavLinkItem
            label="Home"
            title="Home"
            href={ROUTE_PATHS.HOME}
            active={pathname === '' || pathname === '/'}
            style={{ borderRadius: defaultRadius }}
            visibleFrom="lg"
          />
          <NavLinkItem
            label="Products"
            title="Products"
            href={ROUTE_PATHS.PRODUCT.INDEX}
            active={pathname.startsWith(ROUTE_PATHS.PRODUCT.INDEX)}
            style={{ borderRadius: defaultRadius }}
          />
          <NavLinkItem
            label="Blogs"
            title="Blogs"
            href={ROUTE_PATHS.BLOG.INDEX}
            active={pathname.startsWith(ROUTE_PATHS.BLOG.INDEX)}
            style={{ borderRadius: defaultRadius }}
          />
          <NavLinkItem
            label="About Us"
            href={ROUTE_PATHS.ABOUT}
            active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
            title="About Us"
            style={{ borderRadius: defaultRadius, display: 'flex', flexWrap: 'nowrap' }}
          />
          <NavLinkItem
            label="Support"
            title="Support"
            href={ROUTE_PATHS.SUPPORT}
            active={pathname.startsWith(ROUTE_PATHS.SUPPORT)}
            style={{ borderRadius: defaultRadius }}
          />
          <NavLinkItem
            label="Profile"
            title={'Visit Your Profile'}
            href={ROUTE_PATHS.PROFILE.INDEX}
            active={pathname.startsWith(ROUTE_PATHS.PROFILE.INDEX)}
            style={{ borderRadius: defaultRadius }}
          />
          <LogoutBtnClientSide user={user} />
          <ColorSchemeToggler />
          <ActionIcon
            variant="subtle"
            color={isDarkTheme ? '#f5f5f5' : 'dark'}
            onClick={spotlight.open}
          >
            {/* <ToolTip title='Search SeaTheMoss.com \nby products, blogs, etc' width='240px'> */}
            <IconSearch />
            {/* </ToolTip> */}
          </ActionIcon>
          <CartDropdown />
        </Flex>
        <Flex hiddenFrom="md" className={navLinkContainer} gap="sm" align="center">
          <IconSearch />
          <CartDropdown />
          {/* <ToolTip title='Toggle navigation'> */}
          {/* Hamburger Menu */}
          <Burger opened={navOpened} onClick={toggleNav} />
          {/* </ToolTip> */}
        </Flex>
      </Group>
    </Container>
  )
}

export default Header
