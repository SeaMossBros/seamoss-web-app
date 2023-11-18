'use client'

import { Button, Grid, Modal, ModalProps, Stack } from '@mantine/core'
import React, { useCallback } from 'react'
import { FormProvider } from 'react-hook-form'

import { useCart } from '@/hooks/useCart'
import useProductForm from '@/hooks/useProductForm'
import { Product } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'
import { WithMetadata } from '@/types/QueryResponse'

import ProductDetails from '../ProductDetails'
import ProductImages from '../ProductImages'

export type ProductPreviewModalProps = ModalProps & {
  product: WithMetadata<Product> | null
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

  const onSubmit = useCallback(
    (data: ProductSelectionFormData) => {
      addToCart(data)
    },
    [addToCart],
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
                  images={productDetails.attributes.images?.data || []}
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
                    ADD TO CART
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
