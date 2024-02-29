import { NavLink, NavLinkProps } from '@mantine/core'
import Link, { LinkProps } from 'next/link'

import { navLink } from '../Header/Header.css'

const NavLinkItem: React.FC<NavLinkProps & LinkProps & { title: string }> = (props) => {
  return <NavLink
    className={navLink} 
    fw={600} 
    component={Link} 
    {...props}
    title={props.title || ''}
  />
}

export default NavLinkItem
