import { useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'

export const useProducts = (queryParams: any) => {
  const productService = useService(ProductService)

  return useQuery({
    queryKey: ProductService.queryKeys.list(queryParams),
    queryFn: () => productService.list(queryParams),
  })
}
