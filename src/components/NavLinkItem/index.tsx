import { NavLink, NavLinkProps, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import Link, { LinkProps } from 'next/link'

import { navLink } from '../Header/Header.css'

const NavLinkItem: React.FC<NavLinkProps & LinkProps> = (props) => {
  return <NavLink
    className={navLink} 
    fw={600} 
    component={Link} 
    {...props} 
  />
}

export default NavLinkItem
