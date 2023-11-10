import { NavLink, NavLinkProps } from '@mantine/core'
import Link, { LinkProps } from 'next/link'

import { navLink } from './Header.css'

const NavLinkItem: React.FC<NavLinkProps & LinkProps> = (props) => {
  return <NavLink className={navLink} fw={600} c='secondary-gray.9' component={Link} {...props} />
}

export default NavLinkItem
