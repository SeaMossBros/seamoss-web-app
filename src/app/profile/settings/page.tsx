import { Container, Group, Title } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import ColorSchemeToggler from '@/components/ColorSchemeToggler'
import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

import { pageCont, title } from '../profile-page.css'

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false })

export const metadata: Metadata = {
  title: 'Settings | Profile | SeaTheMoss',
}

const SettingsPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()
  if (!user || !user) return <div>No User Info</div>

  return (
    <Container size={'100%'} className={pageCont}>
      <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'}>
        <Title className={title}>Settings</Title>
        <ColorSchemeToggler />
      </Group>
      <NavbarClientSide user={user} key={2} />
    </Container>
  )
}

export default SettingsPage
