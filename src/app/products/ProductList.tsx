'use client'

import { Grid } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { PropsWithChildren, useCallback, useState } from 'react'

import ProductCard from '@/components/ProductCard'
import ProductPreviewModal from '@/components/ProductPreviewModal'
import { useProducts } from '@/queries/useProducts'
import { Product, Product_Plain } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

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
  queryParams: QueryParams<Product_Plain>
}

const ProductList: React.FC<ProductListProps> = ({ queryParams }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productPreviewOpened, productPreview] = useDisclosure(false, {
    onClose: () => {
      setSelectedProduct(null)
    },
  })

  const { data: products } = useProducts(queryParams)

  const onAddToCart = useCallback(
    async (product: Product) => {
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
