'use client'

import { Box, Button, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import omit from 'lodash/omit'
import Link from 'next/link'
import { useCallback, useContext } from 'react'
import { flushSync } from 'react-dom'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { CartContext } from '@/providers/CartProvider'
import CartService, { AddToCartData } from '@/services/cart.service'
import { ProductSelectionFormData } from '@/types/ProductForm'

import { useService } from './useService'

export const useCart = () => {
  const { cartId, setCartId, ...cartContext } = useContext(CartContext)
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
      if (res?.error) {
        console.error(res.error)
        notifications.show({
          color: 'red',
          message: 'Unexpected error occurred',
        })
        return
      }
      notifications.show({
        variant: 'success',
        message: (
          <Box>
            <Text>Added {variables.product_name} to cart</Text>
            <Button variant="transparent" component={Link} href={ROUTE_PATHS.CART} p={0}>
              View cart
            </Button>
          </Box>
        ),
      })
      queryClient.refetchQueries({
        queryKey: CartService.queryKeys.getById(cartId!),
      })
    },
    onError: (err) => {
      console.error(err)
      notifications.show({
        color: 'red',
        message: 'Unexpected error occurred',
      })
      return
    },
  })

  const addToCart = useCallback(
    async (data: ProductSelectionFormData, options?: Parameters<typeof addItem>[1]) => {
      if (!cartId) {
        const cart = await createCart()
        flushSync(() => {
          setCartId(cart.data!.id)
        })
      }
      if (!cartId) return
      addItem(
        {
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
        },
        options,
      )
    },
    [addItem, cartId, createCart, setCartId],
  )

  return {
    ...cartContext,
    cartId,
    addToCart,
    isAddingToCart: isCreatingCart || isAddingItem,
  }
}