import { Container } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

import { pageCont } from '../profile-page.css'
import SettingsContainer from './SettingsContainer'

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false })

export const metadata: Metadata = {
  title: 'Settings | Profile | SeaTheMoss',
}

const SettingsPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()
  if (!user || !user) return <div>No User Info</div>

  return (
    <Container size={'100%'} className={pageCont}>
      <SettingsContainer user={user} />
      <NavbarClientSide user={user} key={2} />
    </Container>
  )
}

export default SettingsPage
