'use client'
import {
  ActionIcon,
  Burger,
  Container,
  Flex,
  Group,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { MoonStars, Sun } from 'tabler-icons-react'

import { ROUTE_PATHS } from '@/consts/route-paths'

import CartDropdown from '../CartNavLink'
import NavLinkItem from '../NavLinkItem'
import { container, logoContainer, navLinkContainer, wrapper } from './Header.css'

export type HeaderProps = {
  navOpened: boolean
  toggleNav: () => void
}

const Header: React.FC<HeaderProps> = ({ navOpened, toggleNav }) => {
  const pathname = usePathname()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'

  return (
    <Container className={container}>
      <Group className={wrapper} justify="space-between" align="center">
        <Link href={ROUTE_PATHS.HOME} className={logoContainer}>
          <Title c="primary-green" order={2}>
            SeaTheMoss
          </Title>
        </Link>

        <Flex visibleFrom="sm" className={navLinkContainer} gap="md">
          <NavLinkItem
            label="Home"
            href={ROUTE_PATHS.HOME}
            active={pathname === '' || pathname === '/'}
          />
          <NavLinkItem
            label="Products"
            href={ROUTE_PATHS.PRODUCT.INDEX}
            active={pathname.startsWith(ROUTE_PATHS.PRODUCT.INDEX)}
          />
          <NavLinkItem
            label="Support"
            href={ROUTE_PATHS.SUPPORT}
            active={pathname.startsWith(ROUTE_PATHS.SUPPORT)}
          />
          <NavLinkItem
            label="Blogs"
            href={ROUTE_PATHS.BLOG.INEDX}
            active={pathname.startsWith(ROUTE_PATHS.BLOG.INEDX)}
          />
          <NavLinkItem
            label="About us"
            href={ROUTE_PATHS.ABOUT}
            active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
          />
          <ActionIcon
            variant="outline"
            color={isDarkTheme ? 'yellow' : 'blue'}
            onClick={() => toggleColorScheme()}
            title="Toggle color scheme"
          >
            {isDarkTheme ? <Sun size={18} /> : <MoonStars size={18} />}
          </ActionIcon>
          <CartDropdown />
        </Flex>
        {/* Hamburger Menu */}
        <Flex hiddenFrom="sm" className={navLinkContainer} gap="md">
          <CartDropdown />
          <Burger opened={navOpened} onClick={toggleNav} aria-label="Toggle navigation" />
        </Flex>
      </Group>
    </Container>
  )
}

export default Header
