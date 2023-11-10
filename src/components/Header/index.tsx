'use client'

import { Burger, Container, Flex, Group, Indicator, Title } from '@mantine/core'
import { IconShoppingCart } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ROUTE_PATHS } from '@/consts/route-paths'

import { cartIcon, container, logoContainer, navLinkContainer, wrapper } from './Header.css'
import NavLinkItem from './NavLinkItem'

export type HeaderProps = {
  navOpened: boolean
  toggleNav: () => void
}

const Header: React.FC<HeaderProps> = ({ navOpened, toggleNav }) => {
  const pathname = usePathname()

  return (
    <Container className={container}>
      <Group className={wrapper} justify='space-between' align='center'>
        <Link href={ROUTE_PATHS.HOME} className={logoContainer}>
          <Title c='primary-green' order={2}>
            SeaTheMoss
          </Title>
        </Link>

        <Flex visibleFrom="sm" className={navLinkContainer} gap='md'>
          <NavLinkItem
            label='Home'
            href={ROUTE_PATHS.HOME}
            active={pathname === '' || pathname === '/'}
          />
          <NavLinkItem
            label='Products'
            href={ROUTE_PATHS.PRODUCT.INDEX}
            active={pathname.startsWith(ROUTE_PATHS.PRODUCT.INDEX)}
          />
          <NavLinkItem
            label='Support'
            href={ROUTE_PATHS.SUPPORT}
            active={pathname.startsWith(ROUTE_PATHS.SUPPORT)}
          />
          <NavLinkItem
            label='About us'
            href={ROUTE_PATHS.ABOUT}
            active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
          />
          <Indicator offset={6} color='primary-green'>
            <NavLinkItem
              href={ROUTE_PATHS.CART}
              leftSection={<IconShoppingCart />}
              classNames={{
                section: cartIcon,
              }}
              active={pathname.startsWith(ROUTE_PATHS.CART)}
            />
          </Indicator>
        </Flex>
        <Flex hiddenFrom="sm" className={navLinkContainer} gap='md'>
          <Indicator offset={6} color='primary-green'>
            <NavLinkItem
              href={ROUTE_PATHS.CART}
              leftSection={<IconShoppingCart />}
              classNames={{
                section: cartIcon,
              }}
              active={pathname.startsWith(ROUTE_PATHS.CART)}
            />
          </Indicator>
          <Burger opened={navOpened} onClick={toggleNav} aria-label="Toggle navigation" />
        </Flex>
      </Group>
    </Container>
  )
}

export default Header
