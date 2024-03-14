import { useMutation } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'

export const useDeleteReview = () => {
  const productService = useService(ProductService)

  return useMutation({
    mutationFn: (reviewId: number | null) => productService.deleteReview(reviewId),
  })
}
