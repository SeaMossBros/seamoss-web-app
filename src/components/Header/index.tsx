'use client'
import { Burger, Container, Flex, Group, Title } from '@mantine/core'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'

import CartDropdown from '../CartNavLink'
import ColorSchemeToggler from '../ColorSchemeToggler'
import NavLinkItem from '../NavLinkItem'
import { container, logoContainer, navLinkContainer, wrapper } from './Header.css'

export type HeaderProps = {
  navOpened: boolean
  toggleNav: () => void
}

const Header: React.FC<HeaderProps> = ({ navOpened, toggleNav }) => {
  const pathname = usePathname()

  return (
    <Container className={container}>
      <Group className={wrapper} justify="space-between" align="center">
        <Link href={ROUTE_PATHS.HOME} className={logoContainer}>
          <Title c="primary-green" order={2}>
            SeaTheMoss
          </Title>
        </Link>

        <Flex visibleFrom="sm" className={navLinkContainer} gap="md" align="center">
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
          <ColorSchemeToggler />
          <CartDropdown />
        </Flex>
        {/* Hamburger Menu */}
        <Flex hiddenFrom="sm" className={navLinkContainer} gap="md" align="center">
          <CartDropdown />
          <Burger opened={navOpened} onClick={toggleNav} aria-label="Toggle navigation" />
        </Flex>
      </Group>
    </Container>
  )
}

export default Header
