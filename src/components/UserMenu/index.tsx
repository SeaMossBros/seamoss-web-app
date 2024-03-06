import { useMantineTheme } from '@mantine/core'
import { usePathname } from 'next/navigation'

import { ROUTE_PATHS } from '@/consts/route-paths'

import { navLink } from '../NavBar/NavBar.css'
import NavLinkItem from '../NavLinkItem'

const UserMenu = ({ onClick, navOpened }: { onClick: any; navOpened: boolean }) => {
  const { defaultRadius } = useMantineTheme()
  const pathname = usePathname()

  return (
    <NavLinkItem
      label="Profile"
      title={'Visit Your Profile'}
      href={ROUTE_PATHS.PROFILE.INDEX}
      active={pathname.startsWith(ROUTE_PATHS.PROFILE.INDEX)}
      style={{ borderRadius: defaultRadius }}
      onClick={onClick}
      className={navOpened ? navLink : ''}
      w={navOpened ? '100%' : 'fit-content'}
    />
  )
}

export default UserMenu
