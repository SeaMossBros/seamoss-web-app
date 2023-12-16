'use client'
import { ActionIcon, Burger, Container, Flex, Group, Image, Title } from '@mantine/core'
import { spotlight } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'

import CartDropdown from '../CartNavLink'
import ColorSchemeToggler from '../ColorSchemeToggler'
import NavLinkItem from '../NavLinkItem'
import UserMenu from '../UserMenu'
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
          <Image src="/images/SeaTheMoss-StillSpinner.svg" alt="Logo" height={40} />
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
            href={ROUTE_PATHS.BLOG.INDEX}
            active={pathname.startsWith(ROUTE_PATHS.BLOG.INDEX)}
          />
          <NavLinkItem
            label="About us"
            href={ROUTE_PATHS.ABOUT}
            active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
          />
          <UserMenu />
          <ColorSchemeToggler />
          <ActionIcon variant="subtle" color="primary-gray" onClick={spotlight.open}>
            <IconSearch />
          </ActionIcon>
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
