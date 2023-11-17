'use client'

import { noop } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { createContext, PropsWithChildren, useCallback, useEffect } from 'react'

import { useService } from '@/hooks/useService'
import CartService from '@/services/cart.service'
import { Cart } from '@/types/Cart'
import { WithMetadata } from '@/types/QueryResponse'

export type CartContextValue = {
  cartId?: number
  setCartId: (id: number) => void
  cart?: WithMetadata<Cart>
}

export const CartContext = createContext<CartContextValue>({
  setCartId: noop,
})

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const cartService = useService(CartService)

  const [cartId, setCartId, removeCartId] = useLocalStorage({
    key: 'cartId',
    deserialize(value) {
      if (!value) return undefined
      return parseInt(value)
    },
  })

  const { data: cartRes } = useQuery({
    queryKey: cartId ? CartService.queryKeys.getById(cartId) : [],
    queryFn: () => cartService.getById(cartId!),
    enabled: Boolean(cartId),
  })

  useEffect(() => {
    if (cartRes?.error) {
      console.error(cartRes.error)
      removeCartId()
    }
  }, [cartRes?.error, removeCartId, setCartId])

  const onSetCartId = useCallback(
    (id: number) => {
      setCartId(id)
    },
    [setCartId],
  )

  return (
    <CartContext.Provider
      value={{
        cartId,
        setCartId: onSetCartId,
        cart: cartRes?.data ?? undefined,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
