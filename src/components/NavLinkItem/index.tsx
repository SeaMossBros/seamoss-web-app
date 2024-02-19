import { NavLink, NavLinkProps, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import Link, { LinkProps } from 'next/link'

import { navLink } from '../Header/Header.css'

const NavLinkItem: React.FC<NavLinkProps & LinkProps> = (props) => {
  const { colors } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  return <NavLink
    className={navLink} 
    fw={600} 
    c={isDarkTheme ? colors.white[0] : (props.active ? '#f5f5f5' : colors.black[9])}
    bg={props.active ? (isDarkTheme ? colors.red[9] : colors.teal[9]) : 'transparent'} 
    component={Link} 
    {...props} 
  />
}

export default NavLinkItem
