'use client'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm, UseFormProps } from 'react-hook-form'

import { usePriceCalculation } from '@/queries/usePriceCalculation'
import ProductService from '@/services/product.service'
import { Product_Plain } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'
import { PurchaseType } from '@/types/PurchaseOption'
import { QueryParams } from '@/types/QueryParams'

import { useService } from './useService'

export default function useProductForm(
  slug?: string,
  queryParams?: QueryParams<Product_Plain>,
  formProps?: UseFormProps<ProductSelectionFormData>,
) {
  const productService = useService(ProductService)
  const methods = useForm<ProductSelectionFormData>(formProps)

  const variant = methods.watch('variant')
  // const properties = methods.watch('properties')
  const purchaseOption = methods.watch('purchaseOption')

  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ProductService.queryKeys.getBySlug(slug!, queryParams),
    queryFn: () => productService.getBySlug(slug!, queryParams),
    select: (res) => res.data,
    enabled: !!slug,
  })

  const { data: estimation } = usePriceCalculation({
    variantId: variant?.id,
    quantity: variant?.quantity,
    purchaseOptionId: purchaseOption?.id,
  })

  console.log('estimation', estimation)

  useEffect(() => {
    if (product) {
      methods.setValue('product', product, {
        shouldDirty: false,
      })
      if (!methods.getValues('variant')) {
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
      }

      if (!methods.getValues('purchaseOption')) {
        const recurringPurchaseOption = product.attributes.purchase_options?.data?.find(
          (opt) => opt.attributes.type === PurchaseType.Recurring,
        )
        if (recurringPurchaseOption) {
          methods.setValue('purchaseOption', recurringPurchaseOption)
        } else {
          methods.setValue('purchaseOption', product.attributes.purchase_options?.data?.at(0))
        }
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

  return {
    product,
    estimation,
    methods,
    isLoading,
    refetch,
  }
}
