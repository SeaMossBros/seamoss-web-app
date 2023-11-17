'use client'

import { Grid } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useCallback, useState } from 'react'

import ProductCard from '@/components/ProductCard'
import ProductPreviewModal from '@/components/ProductPreviewModal'
import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'
import { Product } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'
import { WithMetadata } from '@/types/QueryResponse'

const ProductCol: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid.Col
      span={{
        base: 12,
        xs: 6,
        sm: 4,
      }}
    >
      {children}
    </Grid.Col>
  )
}

export type ProductListProps = {
  queryParams: QueryParams<Product>
}

const ProductList: React.FC<ProductListProps> = ({ queryParams }) => {
  const productService = useService(ProductService)

  const [selectedProduct, setSelectedProduct] = useState<WithMetadata<Product> | null>(null)
  const [productPreviewOpened, productPreview] = useDisclosure(false, {
    onClose: () => {
      setSelectedProduct(null)
    },
  })

  const { data: products } = useQuery({
    queryKey: ProductService.queryKeys.list(queryParams),
    queryFn: () => productService.list(queryParams),
  })

  const onAddToCart = useCallback(
    async (product: WithMetadata<Product>) => {
      setSelectedProduct(product)
      productPreview.open()
    },
    [productPreview],
  )

  return (
    <>
      <Grid>
        {products?.data?.map((product) => (
          <ProductCol key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </ProductCol>
        ))}
      </Grid>
      <ProductPreviewModal
        opened={productPreviewOpened}
        onClose={productPreview.close}
        product={selectedProduct}
      />
    </>
  )
}

export default ProductList
