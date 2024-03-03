import { Container, Group, Title } from '@mantine/core'
import { Metadata } from 'next'
import dynamic from 'next/dynamic'

import { getSessionFromCookies } from '@/lib/crypt'
import { AuthUser } from '@/types/Auth'

import { pageCont, title } from '../profile-page.css'

const NavbarClientSide = dynamic(() => import('../NavbarSegment'), { ssr: false })
const OrdersListClientSide = dynamic(() => import('./OrdersList'), { ssr: false })

export const metadata: Metadata = {
  title: 'Orders | Profile | SeaTheMoss',
}

const OrdersPage: React.FC = async () => {
  const user: AuthUser | null = await getSessionFromCookies()
  if (!user || !user.id) return <div>No User Info</div>

  return (
    <Container size={'100%'} className={pageCont}>
      <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'} justify="center">
        <Title className={title}>Your Orders</Title>
        <OrdersListClientSide user={user} />
      </Group>
      <NavbarClientSide user={user} key={4} />
    </Container>
  )
}

export default OrdersPage
