'use client'

import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import omit from 'lodash/omit'
import { useCallback, useContext } from 'react'
import { flushSync } from 'react-dom'

import { CartContext } from '@/providers/CartProvider'
import CartService, { AddToCartData } from '@/services/cart.service'
import { ProductSelectionFormData } from '@/types/ProductForm'

import { useService } from './useService'

export const useCart = () => {
  const { cartId, setCartId } = useContext(CartContext)
  const queryClient = useQueryClient()
  const cartService = useService(CartService)

  const { mutateAsync: createCart, isPending: isCreatingCart } = useMutation({
    mutationFn: () => cartService.createCart(),
  })

  const { mutate: addItem, isPending: isAddingItem } = useMutation({
    mutationFn: (
      data: AddToCartData & {
        product_name: string
      },
    ) => cartService.addToCart(omit(data, 'product_name')),
    onSuccess: (res, variables) => {
      if (res.error) {
        console.error(res.error)
        notifications.show({
          color: 'red',
          message: 'Unexpected error occurred',
        })
        return
      }
      notifications.show({
        variant: 'success',
        message: `Added ${variables.product_name} to cart`,
      })
      queryClient.refetchQueries({
        queryKey: CartService.queryKeys.getById(cartId!),
      })
    },
  })

  const addToCart = useCallback(
    async (data: ProductSelectionFormData) => {
      if (!cartId) {
        const cart = await createCart()
        flushSync(() => {
          setCartId(cart.data!.id)
        })
      }
      if (!cartId) return
      addItem({
        cartId,
        product_name: data.product.attributes.name,
        productId: data.product.id,
        variant: {
          variantId: data.variant!.id,
          quantity: data.variant!.quantity,
        },
        properties: data.properties?.map((property) => ({
          propertyId: property.id,
          quantity: property.quantity,
        })),
        purchaseOptionId: data.purchaseOption!.id,
      })
    },
    [addItem, cartId, createCart, setCartId],
  )

  return {
    addToCart,
    isAddingToCart: isCreatingCart || isAddingItem,
  }
}
