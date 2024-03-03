import { useMantineTheme } from '@mantine/core'
import { usePathname } from 'next/navigation'

import { ROUTE_PATHS } from '@/consts/route-paths'

import NavLinkItem from '../NavLinkItem'

const UserMenu = () => {
  const { defaultRadius } = useMantineTheme()
  const pathname = usePathname()

  // console.log('user in usermenu', user);
  return (
    <NavLinkItem
      label="Profile"
      title={'Profile'}
      href={ROUTE_PATHS.PROFILE.INDEX}
      active={pathname.startsWith(ROUTE_PATHS.PROFILE.INDEX)}
      style={{ borderRadius: defaultRadius }}
    />
  )
}

export default UserMenu
