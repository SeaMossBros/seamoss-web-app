import { Center, Text, useMantineTheme } from '@mantine/core'
import { usePathname } from 'next/navigation'

import { ROUTE_PATHS } from '@/consts/route-paths'

import NavLinkItem from '../NavLinkItem'
import { useEffect, useState } from 'react'
import { getUser } from '@/lib/auth'
import { AuthUser } from '@/types/Auth'

const UserMenu = () => {
  // const [user, setUser] = useState<AuthUser | null>(null);
  const { defaultRadius} = useMantineTheme();
  const pathname = usePathname();
  const onLoginPage = pathname.endsWith('/login')

  // const onLogout = async () => {
  //   await fetch('/api/auth/logout', { method: 'POST' }); 
  // }

  // console.log('on usermenu');

  // useEffect(() => {
  //   const runGetUserFromSession = async () => {
  //     console.log('in runGetUserFromSession')
  //     const user: AuthUser | null = await getUser();
  //     console.log('user on usermenu', user);
  //     if (user && user.id) setUser(user);
  //   }

  //   runGetUserFromSession();
  // }, []) 

  // if (!user) return (
  return onLoginPage ? (
    <Text title='Please Login First'>
      <NavLinkItem
        label="Profile"
        disabled
        title=''
        href={ROUTE_PATHS.PROFILE.INDEX}
        active={pathname.startsWith(ROUTE_PATHS.PROFILE.INDEX)}
        style={{ borderRadius: defaultRadius }}
      />
    </Text>
  ) : (
    <NavLinkItem
      label="Profile"
      title={'Profile'}
      href={ROUTE_PATHS.PROFILE.INDEX}
      active={pathname.startsWith(ROUTE_PATHS.PROFILE.INDEX)}
      style={{ borderRadius: defaultRadius }}
    />
  )
  // )

  // return (
  //   <Center>
  //     <NavLinkItem
  //       label="Profile"
  //       href={ROUTE_PATHS.PROFILE.INDEX}
  //       active={pathname.startsWith(ROUTE_PATHS.PROFILE.INDEX)}
  //       style={{borderRadius: defaultRadius}}
  //     />
  //     <NavLinkItem
  //       label="Logout"
  //       href={ROUTE_PATHS.HOME}
  //       active={false}
  //       style={{borderRadius: defaultRadius}}
  //       onClick={onLogout}
  //     /> 
  //   </Center> 
  // )
}

export default UserMenu
