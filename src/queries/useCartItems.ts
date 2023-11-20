import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import CartService from '@/services/cart.service'
import { CartItem } from '@/types/CartItem'
import { QueryResponse, WithMetadata } from '@/types/QueryResponse'

type QueryOptions = Omit<
  UndefinedInitialDataOptions<
    QueryResponse<WithMetadata<CartItem>[]>,
    Error,
    QueryResponse<WithMetadata<CartItem>[]>,
    (string | number)[]
  >,
  'queryKey' | 'queryFn'
>

export const useCartItems = (cartId: number, options?: QueryOptions) => {
  const cartService = useService(CartService)

  return useQuery({
    queryKey: CartService.queryKeys.getCartItems(cartId),
    queryFn: () => cartService.getCartItems(cartId),
    ...options,
  })
}
