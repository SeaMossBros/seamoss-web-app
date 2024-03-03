import { Container, Group, Title } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getFromCookies, getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

import { pageCont, title } from '../profile-page.css'

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false })
const UpdatePasswordClientSide = dynamic(() => import('./UpdatePassword'), { ssr: false })
const ResetPasswordClientSide = dynamic(() => import('./ResetPassword'), { ssr: false })

export const metadata: Metadata = {
  title: 'Change Password | Profile | SeaTheMoss',
}

const ChangePasswordPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()
  const password: string | null = await getFromCookies('tp')
  if (!user) return <div>No User Info</div>

  return (
    <Container size={'100%'} className={pageCont}>
      <Group display={'flex'} style={{ flexDirection: 'column', flexWrap: 'nowrap' }} w={'100%'}>
        <Title className={title}>Secure Your Account</Title>
        <UpdatePasswordClientSide password={password ? password : ''} />
        <ResetPasswordClientSide email={user.email ? user.email : ''} />
      </Group>
      <NavbarClientSide user={user} key={6} />
    </Container>
  )
}

export default ChangePasswordPage
