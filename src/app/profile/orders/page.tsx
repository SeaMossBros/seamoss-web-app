import { Container } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

import { pageCont } from '../profile-page.css'
import OrdersContainer from './OrdersContainer'

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false })

export const metadata: Metadata = {
  title: 'Orders | Profile | SeaTheMoss',
}

const OrdersPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()
  if (!user || !user.id) return <div>No User Info</div>

  return (
    <Container size={'100%'} className={pageCont}>
      <OrdersContainer user={user} />
      <NavbarClientSide user={user} key={4} />
    </Container>
  )
}

export default OrdersPage
