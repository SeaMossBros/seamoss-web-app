import { useMutation } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'

export const useUpdateReview = () => {
  const productService = useService(ProductService)

  return useMutation({
    mutationFn: (data: Parameters<ProductService['updateReview']>[0]) =>
      productService.updateReview(data),
  })
}
