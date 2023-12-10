import { useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'
import { Product_NoRelations_WithMinPrice } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

export const useProducts = (queryParams: QueryParams<Product_NoRelations_WithMinPrice>) => {
  const productService = useService(ProductService)

  return useQuery({
    queryKey: ProductService.queryKeys.list(queryParams),
    queryFn: () => productService.list(queryParams),
  })
}
