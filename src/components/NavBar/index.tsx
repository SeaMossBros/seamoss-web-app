import { Stack } from '@mantine/core'
import { usePathname } from 'next/navigation'

import { ROUTE_PATHS } from '@/consts/route-paths'

import NavLinkItem from '../NavLinkItem'
import { navLink } from './NavBar.css'

export type NavBarProps = {
  onClose: () => void
}

const NavBar: React.FC<NavBarProps> = ({ onClose }) => {
  const pathname = usePathname()

  return (
    <Stack w="100%">
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
        label="About us"
        href={ROUTE_PATHS.ABOUT}
        active={pathname.startsWith(ROUTE_PATHS.ABOUT)}
        onClick={onClose}
      />
    </Stack>
  )
}

export default NavBar
