'use client'

import {
  Grid,
  Pagination,
  Stack,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import React, { PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react'

import ProductCard from '@/components/ProductCard'
import ProductPreviewModal from '@/components/ProductPreviewModal'
import { useProducts } from '@/queries/useProducts'
import { Product, Product_NoRelations } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'

import { pagination, productsContainer, topProductsTitle } from './ProductList.css'

const ProductExtraSmallCol: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid.Col
      span={{
        base: 12,
        xs: 4,
        sm: 4,
        md: 4,
      }}
    >
      {children}
    </Grid.Col>
  )
}

const ProductSmallCol: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid.Col
      span={{
        base: 6,
        xs: 6,
        sm: 6,
        md: 4,
      }}
    >
      {children}
    </Grid.Col>
  )
}

const ProductCol: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid.Col
      span={{
        base: 8,
        xs: 4,
        sm: 4,
        md: 4,
      }}
    >
      {children}
    </Grid.Col>
  )
}

export type ProductListProps = {
  queryParams: QueryParams<Product_NoRelations>
  onPage: string
}

const ProductList: React.FC<ProductListProps> = ({ queryParams, onPage }) => {
  const { colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [windowIsMobileView, setWindowIsMobileView] = useState(false)
  const [windowIsExtraSmallMobileView, setWindowIsExtraSmallMobileView] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productPreviewOpened, productPreview] = useDisclosure(false, {
    onClose: () => {
      setSelectedProduct(null)
    },
  })

  const { data: products } = useProducts(queryParams)

  const totalPages = useMemo(
    () =>
      Math.ceil((products?.meta?.pagination.total ?? 0) / (queryParams.pagination?.pageSize || 1)),
    [products?.meta?.pagination.total, queryParams.pagination?.pageSize],
  )

  const onQuickViewClick = useCallback(
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

  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowIsMobileView(window.innerWidth < 540)
      setWindowIsExtraSmallMobileView(window.innerWidth < 350)
    })
    setWindowIsMobileView(window.innerWidth < 540)
    setWindowIsExtraSmallMobileView(window.innerWidth < 350)
  }, [])

  return (
    <Stack gap="xl" className={productsContainer}>
      {onPage === 'Home' && (
        <Title
          size={'h1'}
          c={isDarkTheme ? colors.gray[3] : colors.gray[9]}
          className={topProductsTitle}
        >
          Our Top Products
        </Title>
      )}
      <Grid>
        {products?.data?.map((product) =>
          windowIsMobileView ? (
            windowIsExtraSmallMobileView ? (
              <ProductExtraSmallCol key={product.id}>
                <ProductCard product={product} onQuickViewClick={onQuickViewClick} />
              </ProductExtraSmallCol>
            ) : (
              <ProductSmallCol key={product.id}>
                <ProductCard product={product} onQuickViewClick={onQuickViewClick} />
              </ProductSmallCol>
            )
          ) : (
            <ProductCol key={product.id}>
              <ProductCard product={product} onQuickViewClick={onQuickViewClick} />
            </ProductCol>
          ),
        )}
      </Grid>
      {onPage !== 'Home' && (
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
      )}
      <ProductPreviewModal
        opened={productPreviewOpened}
        onClose={productPreview.close}
        product={selectedProduct}
      />
    </Stack>
  )
}

export default ProductList
