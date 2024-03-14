'use client'

import { Group, Title } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { AuthUser } from '@/types/Auth'

import { totalTitleStyle } from '../profile-page.css'

const OrdersListClientSide = dynamic(() => import('./OrdersList'), { ssr: false })

interface OrdersListProps {
  user: AuthUser
}

const OrdersContainer = ({ user }: OrdersListProps) => {
  const [totalOrders, setTotalOrders] = useState(0)
  if (!user.id) return <div>no user</div>

  return (
    <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'}>
      <Title className={totalTitleStyle}>
        You have {totalOrders} order{totalOrders === 1 ? '' : 's'}
      </Title>
      <OrdersListClientSide user={user} setTotalOrders={(num) => setTotalOrders(num)} />
    </Group>
  )
}

export default OrdersContainer
