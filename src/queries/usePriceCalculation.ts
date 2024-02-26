import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import APIService from '@/services/api.service'

type QueryOptions = Omit<UndefinedInitialDataOptions<
    { data: { totalPrice: number, discountedPrice: number | null }},
    Error, { totalPrice: number, discountedPrice: number | null },
    (string | [variantId: number, quantity: number, purchaseOptionId: number])[]
  >, 'queryKey' | 'queryFn'>

export const usePriceCalculation = (
  data: {
    variantId?: number
    quantity?: number
    purchaseOptionId?: number
  },
  options?: QueryOptions,
) => {
  const apiService = useService(APIService)
  
  return useQuery({
    queryKey: APIService.queryKeys.getPriceEstimation(
      data.variantId!,
      data.quantity!,
      data.purchaseOptionId!,
    ),
    queryFn: () =>
      apiService.getPriceEstimation(data.variantId!, data.quantity!, data.purchaseOptionId!),
    enabled: Boolean(data.variantId && data.quantity && data.purchaseOptionId),
    select: (res) => res.data,
    ...options,
  })
}
