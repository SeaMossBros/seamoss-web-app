'use client'

import { noop } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { RefetchOptions } from '@tanstack/react-query'
import { createContext, PropsWithChildren, useCallback, useEffect } from 'react'

import { useCartData } from '@/queries/useCartData'
import { Cart } from '@/types/Cart'
import { WithMetadata } from '@/types/QueryResponse'

export type CartContextValue = {
  cartId?: number
  setCartId: (id: number) => void
  cart?: WithMetadata<Cart>
  refetch: (options?: RefetchOptions) => void
}

export const CartContext = createContext<CartContextValue>({
  setCartId: noop,
  refetch: noop,
})

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cartId, setCartId, removeCartId] = useLocalStorage({
    key: 'cartId',
    deserialize(value) {
      if (!value) return undefined
      return parseInt(value)
    },
  })

  const { data: cartRes, refetch } = useCartData(cartId)

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
        refetch,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
