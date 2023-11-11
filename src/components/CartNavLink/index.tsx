'use client'

import { Indicator } from "@mantine/core"
import { IconShoppingCart } from "@tabler/icons-react"
import { useQuery } from "@tanstack/react-query"
import { usePathname } from "next/navigation"
import { useContext, useMemo } from "react"

import { ROUTE_PATHS } from "@/consts/route-paths"
import { useService } from "@/hooks/useService"
import { CartContext } from "@/providers/CartProvider"
import CartService from "@/services/cart.service"

import NavLinkItem from "../NavLinkItem"
import { cartIcon, indicator } from "./CartNavLink.css"

const CartNavLink: React.FC = () => {
  const { cartId } = useContext(CartContext)
  const pathname = usePathname()

  const cartService = useService(CartService)

  const { data: cart } = useQuery({
    queryKey: CartService.queryKeys.getById(cartId!),
    queryFn: () => cartService.getById(cartId!),
    enabled: !!cartId,
    select: (res) => res.data
  })

  const itemsCount = useMemo(() => cart?.attributes.cart_items.data.length, [cart?.attributes.cart_items?.data.length])

  return (
    <Indicator classNames={{
      indicator: indicator
    }} offset={6} color='primary-green' label={itemsCount} disabled={!itemsCount}>
      <NavLinkItem
        href={ROUTE_PATHS.CART}
        leftSection={<IconShoppingCart />}
        classNames={{
          section: cartIcon,
        }}
        active={pathname.startsWith(ROUTE_PATHS.CART)}
      />
    </Indicator>
  )
}

export default CartNavLink