'use client'

import { Grid, Pagination, Stack } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { PropsWithChildren, useCallback, useMemo, useState } from 'react'

import ProductCard from '@/components/ProductCard'
import ProductPreviewModal from '@/components/ProductPreviewModal'
import { useProducts } from '@/queries/useProducts'
import { Product, Product_NoRelations } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

import { pagination } from './ProductList.css'

const ProductCol: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid.Col
      span={{
        base: 12,
        xs: 6,
        sm: 4,
        md: 3,
      }}
    >
      {children}
    </Grid.Col>
  )
}

export type ProductListProps = {
  queryParams: QueryParams<Product_NoRelations>
}

const ProductList: React.FC<ProductListProps> = ({ queryParams }) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productPreviewOpened, productPreview] = useDisclosure(false, {
    onClose: () => {
      setSelectedProduct(null)
    },
  })

  const { data: products } = useProducts(queryParams)

  const totalPages = useMemo(
    () =>
      Math.ceil((products?.meta.pagination.total ?? 0) / (queryParams.pagination?.pageSize || 1)),
    [products?.meta.pagination.total, queryParams.pagination?.pageSize],
  )

  const onAddToCart = useCallback(
    async (product: Product) => {
      setSelectedProduct(product)
      productPreview.open()
    },
    [productPreview],
  )

  const buildPageHref = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('page', page.toString())
    const href = `${pathname}?${newSearchParams.toString()}`
    return href
  }

  return (
    <Stack gap="lg">
      <Grid>
        {products?.data?.map((product) => (
          <ProductCol key={product.id}>
            <ProductCard product={product} onAddToCart={onAddToCart} />
          </ProductCol>
        ))}
      </Grid>
      <Pagination
        className={pagination}
        total={totalPages}
        value={queryParams.pagination?.page}
        getItemProps={(page) => ({
          component: Link,
          href: buildPageHref(page),
        })}
        getControlProps={(control) => {
          if (control === 'next') {
            const disabled = queryParams.pagination?.page === totalPages
            return {
              component: Link,
              href: buildPageHref((queryParams.pagination?.page ?? 0) + 1),
              disabled,
              ...(disabled
                ? {
                    style: {
                      pointerEvents: 'none',
                    },
                  }
                : {}),
            }
          }

          if (control === 'previous') {
            const disabled = (queryParams.pagination?.page || 1) === 1
            return {
              component: Link,
              href: buildPageHref((queryParams.pagination?.page ?? 2) - 1),
              disabled,
              ...(disabled
                ? {
                    style: {
                      pointerEvents: 'none',
                    },
                  }
                : {}),
            }
          }

          return {}
        }}
      />
      <ProductPreviewModal
        opened={productPreviewOpened}
        onClose={productPreview.close}
        product={selectedProduct}
      />
    </Stack>
  )
}

export default ProductList
