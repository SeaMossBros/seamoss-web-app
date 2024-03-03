import { Container } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

import { pageCont } from './profile-page.css'

const NavbarClientSide = dynamic(() => import('./NavbarSegment'), { ssr: false })

export const metadata: Metadata = {
  title: 'Profile | SeaTheMoss',
}

const ProfilePage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()
  if (!user || !user) return <div>No User Info</div>

  return (
    <Container size={'100vw'} className={pageCont}>
      <NavbarClientSide user={user} key={1} />
    </Container>
  )
}

export default ProfilePage
