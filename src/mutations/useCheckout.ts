import { useMutation } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import OrderService from '@/services/order.service'

export const useCheckout = (email: string) => {
  const orderService = useService(OrderService)

  return useMutation({
    mutationFn: (cartId: number) => orderService.create({ cartId, email }),
    throwOnError: true,
  })
}
