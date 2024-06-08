import { Container } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

import { pageCont } from '../profile-page.css'
import CustomerOrdersContainer from './CustomerOrdersContainer'

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false })

export const metadata: Metadata = {
  title: 'Customer Orders | SeaTheMoss',
}

const CustomerOrdersPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()
  if (!user || !user.id) return <div>No User Info</div>

  return (
    <Container size={'100%'} className={pageCont}>
      <CustomerOrdersContainer user={user} />
      <NavbarClientSide user={user} key={4} />
    </Container>
  )
}

export default CustomerOrdersPage
