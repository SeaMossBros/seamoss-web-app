import { useMutation } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'

export const useSubmitReview = (productId: number) => {
  const productService = useService(ProductService)

  return useMutation({
    mutationFn: (data: Parameters<ProductService['submitReview']>[1]) =>
      productService.submitReview(productId, data),
  })
}
