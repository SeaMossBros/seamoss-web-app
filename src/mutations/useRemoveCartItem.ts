import { useMutation } from '@tanstack/react-query'

import { useCart } from '@/hooks/useCart'
import { useService } from '@/hooks/useService'
import CartService from '@/services/cart.service'

export const useRemoveCartItem = () => {
  const cartService = useService(CartService)
  const { refetch } = useCart()

  const {
    mutate: remove,
    mutateAsync: removeAsync,
    isPending,
  } = useMutation({
    mutationFn: (cartItemId: number) => cartService.removeItem(cartItemId),
    onSuccess: () => {
      refetch()
    },
  })

  return {
    remove,
    removeAsync,
    isLoading: isPending,
  }
}
