'use client'

import { Button, Grid, Stack } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useCallback, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import ProductDetails from '@/components/ProductDetails'
import ProductImages from '@/components/ProductImages'
import { useService } from '@/hooks/useService'
import APIService from '@/services/api.service'
import ProductService from '@/services/product.service'
import { Product } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'
import { PurchaseType } from '@/types/PurchaseOption'
import { QueryParams } from '@/types/QueryParams'

export type ProductSingleProps = {
  slug: string
  queryParams: QueryParams<Product>
}

const ProductSingle: React.FC<ProductSingleProps> = ({ slug, queryParams }) => {
  const productService = useService(ProductService)
  const apiService = useService(APIService)

  const methods = useForm<ProductSelectionFormData>()

  const variant = methods.watch('variant')
  const purchaseOption = methods.watch('purchaseOption')

  const { data: product } = useQuery({
    queryKey: ProductService.queryKeys.getBySlug(slug, queryParams),
    queryFn: () => productService.getBySlug(slug, queryParams),
    select: (res) => res.data,
  })

  const { data: estimation } = useQuery({
    queryKey: APIService.queryKeys.getPriceEstimation(
      variant?.id || 0,
      variant?.quantity || 0,
      purchaseOption?.id || 0,
    ),
    queryFn: () =>
      apiService.getPriceEstimation(variant!.id, variant!.quantity, purchaseOption!.id),
    enabled: Boolean(variant?.id && variant?.quantity && purchaseOption?.id),
    select: (res) => res.data,
  })

  useEffect(() => {
    if (product) {
      methods.setValue('product', product)
      let defaultVariant = product.attributes.product_variants?.data?.find(
        (v) => v.attributes.is_default,
      )
      if (!defaultVariant) {
        defaultVariant = product.attributes.product_variants?.data?.at(0)
      }
      if (defaultVariant) {
        methods.setValue('variant', {
          ...defaultVariant,
          quantity: 1,
        })
      }

      const recurringPurchaseOption = product.attributes.purchase_options?.data?.find(
        (opt) => opt.attributes.type === PurchaseType.Recurring,
      )
      if (recurringPurchaseOption) {
        methods.setValue('purchaseOption', recurringPurchaseOption)
      } else {
        methods.setValue('purchaseOption', product.attributes.purchase_options?.data?.at(0))
      }
    }
  }, [methods, product])

  useEffect(() => {
    if (estimation) {
      methods.setValue('totalPrice', estimation.totalPrice)
      methods.setValue('discountedPrice', estimation.discountedPrice)
    } else {
      methods.setValue('totalPrice', null)
      methods.setValue('discountedPrice', null)
    }
  }, [estimation, methods])

  const onSubmit = useCallback((data: ProductSelectionFormData) => {
    console.log({
      data,
    })
  }, [])

  if (!product) return null

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Grid gutter="xl">
          <Grid.Col
            span={{
              base: 12,
              md: 6,
            }}
          >
            <ProductImages
              productName={product.attributes.name}
              defaultImage={product?.attributes.thumbnail?.data}
              images={product?.attributes.images?.data || []}
            />
          </Grid.Col>
          <Grid.Col
            span={{
              base: 12,
              md: 6,
            }}
          >
            <Stack gap="lg">
              <ProductDetails product={product} />
              <Button type="submit" fullWidth>
                ADD TO CART
              </Button>
            </Stack>
          </Grid.Col>
        </Grid>
      </form>
    </FormProvider>
  )
}

export default ProductSingle
