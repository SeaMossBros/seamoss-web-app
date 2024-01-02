'use client'

import { Button, Grid, Modal, ModalProps, Stack } from '@mantine/core'
import uniqBy from 'lodash/uniqBy'
import React, { useCallback, useMemo } from 'react'
import { FormProvider } from 'react-hook-form'

import { useCart } from '@/hooks/useCart'
import useProductForm from '@/hooks/useProductForm'
import { Product } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'

import ProductDetails from '../ProductDetails'
import ProductImages from '../ProductImages'

export type ProductPreviewModalProps = ModalProps & {
  product: Product | null
}

const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({ product, ...modalProps }) => {
  const { addToCart, isAddingToCart } = useCart()

  const { product: productDetails, methods } = useProductForm(product?.attributes.slug, {
    populate: {
      images: true,
      videos: true,
      thumbnail: true,
      product_variants: {
        populate: ['image'],
      },
      product_properties: {
        populate: ['image'],
      },
      purchase_options: true,
    },
  })

  const images = useMemo(
    () =>
      uniqBy(
        [
          ...(product?.attributes.thumbnail?.data ? [product.attributes.thumbnail.data] : []),
          ...(product?.attributes.images?.data || []),
        ],
        'id',
      ),
    [product],
  )

  const onSubmit = useCallback(
    (data: ProductSelectionFormData) => {
      addToCart(data, {
        onSettled: (_, error) => {
          if (error) return
          modalProps.onClose()
        },
      })
    },
    [addToCart, modalProps],
  )

  if (!product) return null

  return (
    <Modal {...modalProps} size="90%" centered>
      {productDetails ? (
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
                  productName={productDetails.attributes.name}
                  defaultImage={productDetails.attributes.thumbnail?.data}
                  images={images}
                />
              </Grid.Col>
              <Grid.Col
                span={{
                  base: 12,
                  md: 6,
                }}
              >
                <Stack gap="lg">
                  <ProductDetails product={productDetails} showOptionImages={false} />
                  <Button type="submit" loading={isAddingToCart} fullWidth>
                    Add To Cart
                  </Button>
                </Stack>
              </Grid.Col>
            </Grid>
          </form>
        </FormProvider>
      ) : null}
    </Modal>
  )
}

export default ProductPreviewModal
