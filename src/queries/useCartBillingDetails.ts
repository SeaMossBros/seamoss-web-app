import { useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import APIService from '@/services/api.service'

export const useCartBillingDetails = (cartId: number) => {
  const apiService = useService(APIService)

  return useQuery({
    queryKey: APIService.queryKeys.getCartBillingDetails(cartId),
    queryFn: () => apiService.getCartBillingDetails(cartId),
    enabled: Boolean(cartId),
    refetchOnMount: true,
    gcTime: 0,
  })
}
