'use client'

import { noop } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { createContext, PropsWithChildren, useCallback } from 'react'

export type CartContextValue = {
  cartId?: number
  setCartId: (id: number) => void
}

export const CartContext = createContext<CartContextValue>({
  setCartId: noop,
})

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [cartId, setCartId] = useLocalStorage({
    key: 'cartId',
    deserialize(value) {
      if (!value) return undefined
      return parseInt(value)
    },
  })

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
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
