'use client'

import { Group, Title } from '@mantine/core'
import dynamic from 'next/dynamic'
import { useState } from 'react'

import { AuthUser } from '@/types/Auth'

import { totalTitleStyle } from '../profile-page.css'

const CusstomerOrdersListClientSide = dynamic(() => import('./CustomerOrdersList'), { ssr: false })

interface CustomerOrdersListProps {
  user: AuthUser
}

const CustomerOrdersContainer = ({ user }: CustomerOrdersListProps) => {
  const [totalOrders, setTotalOrders] = useState(0)
  if (!user.id) return <div>no user</div>

  return (
    <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'}>
      <Title className={totalTitleStyle}>
        There{' '}
        {totalOrders > 1
          ? `are ${totalOrders} orders`
          : totalOrders === 1
            ? `is ${totalOrders} order`
            : 'are no orders'}{' '}
        left to ship
      </Title>
      <CusstomerOrdersListClientSide user={user} setTotalOrders={(num) => setTotalOrders(num)} />
    </Group>
  )
}

export default CustomerOrdersContainer
