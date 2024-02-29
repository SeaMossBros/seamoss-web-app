'use client'
import { ActionIcon, Burger, Container, Flex, Group, Image, Title, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { spotlight } from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'

import CartDropdown from '../CartNavLink'
import ColorSchemeToggler from '../ColorSchemeToggler'
import NavLinkItem from '../NavLinkItem'
import UserMenu from '../UserMenu'
import { container, logoContainer, navLinkContainer, wrapper } from './Header.css'
import ToolTip from '../ToolTip'

export type HeaderProps = {
  navOpened: boolean
  toggleNav: () => void
}

const Header: React.FC<HeaderProps> = ({ navOpened, toggleNav }) => {
  const router = useRouter();
  const pathname = usePathname()
  const { primaryColor, defaultRadius } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  
  return (
    <Container className={container}>
      <Group className={wrapper} justify="space-between" align="center">
        <Link href={ROUTE_PATHS.HOME} className={logoContainer}>
          <Image src="/images/SeaTheMoss-Empty-Icon.png" alt="Logo" height={40} visibleFrom="sm" />
          <Title 
            c={primaryColor}
            order={2}
          >
            SeaTheMoss
          </Title>
        </Link>

        <Flex visibleFrom="md" className={navLinkContainer} gap="md" align="center">
          <NavLinkItem
            label="Home"
            title="Home"
            href={ROUTE_PATHS.HOME}
            active={pathname === '' || pathname === '/'}
            style={{borderRadius: defaultRadius}}
          />
          <NavLinkItem
            label="Products"
            title="Products"
            href={ROUTE_PATHS.PRODUCT.INDEX}
            active={pathname.startsWith(ROUTE_PATHS.PRODUCT.INDEX)}
            style={{borderRadius: defaultRadius}}
          />
          <NavLinkItem
            label="Support"
            title="Support"
            href={ROUTE_PATHS.SUPPORT}
            active={pathname.startsWith(ROUTE_PATHS.SUPPORT)}
            style={{borderRadius: defaultRadius}}
          />
          <NavLinkItem
            label="Blogs"
            title="Blogs"
            href={ROUTE_PATHS.BLOG.INDEX}
            active={pathname.startsWith(ROUTE_PATHS.BLOG.INDEX)}
            style={{borderRadius: defaultRadius}}
          />
          <NavLinkItem
            label="About us"
            href={ROUTE_PATHS.ABOUT}
            active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
            title='About us'
            style={{borderRadius: defaultRadius}}
          />
          <UserMenu /> 
          <ColorSchemeToggler />
          <ActionIcon variant="subtle" color={isDarkTheme ? '#f5f5f5' : 'dark' } onClick={spotlight.open}>
            {/* <ToolTip title='Search SeaTheMoss.com \nby products, blogs, etc' width='240px'> */}
              <IconSearch />
            {/* </ToolTip> */}
          </ActionIcon>
          <CartDropdown />
        </Flex>
        {/* Hamburger Menu */}
        <Flex hiddenFrom="md" className={navLinkContainer} gap='sm' align="center">
          <CartDropdown />
          {/* <ToolTip title='Toggle navigation'> */}
            <Burger opened={navOpened} onClick={toggleNav} />
          {/* </ToolTip> */}
        </Flex>
      </Group>
    </Container>
  )
}

export default Header
