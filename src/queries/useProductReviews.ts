import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'
import { ProductReview, ProductReview_NoRelations } from '@/types/ProductReview'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

type QueryOptions = Omit<
  UndefinedInitialDataOptions<
    QueryResponse<ProductReview[]>,
    Error,
    QueryResponse<ProductReview[]>,
    (string | QueryParams<ProductReview_NoRelations> | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export const useProductReviews = (
  params: QueryParams<ProductReview_NoRelations>,
  options?: QueryOptions,
) => {
  const productService = useService(ProductService)

  return useQuery({
    ...options,
    queryKey: ProductService.queryKeys.getProductReviews(params),
    queryFn: () => productService.getProductReviews(params),
  })
}
