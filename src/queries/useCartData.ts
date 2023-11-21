import { useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import CartService from '@/services/cart.service'

export const useCartData = (cartId: number | undefined) => {
  const cartService = useService(CartService)

  return useQuery({
    queryKey: CartService.queryKeys.getById(cartId!),
    queryFn: () => cartService.getById(cartId!),
    enabled: !!cartId,
  })
}
