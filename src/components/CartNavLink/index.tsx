'use client'

import { Indicator } from '@mantine/core'
import { IconShoppingCart } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useContext, useMemo } from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { CartContext } from '@/providers/CartProvider'
import { useCartData } from '@/queries/useCartData'

import NavLinkItem from '../NavLinkItem'
import { cartIcon, indicator } from './CartNavLink.css'
import ToolTip from '../ToolTip'

const CartNavLink: React.FC = () => {
  const { cartId } = useContext(CartContext)
  const pathname = usePathname()

  const { data: cartRes } = useCartData(cartId)

  const itemsCount = useMemo(
    () => cartRes?.data?.attributes.cart_items.data?.length,
    [cartRes?.data?.attributes.cart_items?.data?.length],
  )

  return (
    <Indicator
      classNames={{
        indicator: indicator,
      }}
      offset={6}
      color="teal"
      label={itemsCount}
      disabled={!itemsCount}
    >
      <ToolTip title='View Your Cart' width='130px'>
        <NavLinkItem
          href={ROUTE_PATHS.CART}
          leftSection={<IconShoppingCart />}
          classNames={{
            section: cartIcon,
          }}
          active={pathname.startsWith(ROUTE_PATHS.CART)}
        />
      </ToolTip>
    </Indicator>
  )
}

export default CartNavLink
