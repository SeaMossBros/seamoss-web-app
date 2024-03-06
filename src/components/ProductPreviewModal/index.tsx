'use client'

import { Button, Grid, Modal, ModalProps, Stack } from '@mantine/core'
import uniqBy from 'lodash/uniqBy'
import React, { useCallback, useMemo, useState } from 'react'
import { FormProvider } from 'react-hook-form'

import { useCart } from '@/hooks/useCart'
import useProductForm from '@/hooks/useProductForm'
import { Product } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'

import ProductDetails from '../ProductDetails'
import ProductImages from '../ProductImages'
import { addToCartButton } from './ProductPreviewModal.css'

export type ProductPreviewModalProps = ModalProps & {
  product: Product | null
}

const ProductPreviewModal: React.FC<ProductPreviewModalProps> = ({ product, ...modalProps }) => {
  const [propertyIsSelected, setPropertyIsSelected] = useState(false)
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

  const handleSetPropertyIsSelected = (value: boolean) => {
    setPropertyIsSelected(value)
  }

  if (!product) return null

  return (
    <Modal {...modalProps} size="90%" centered xOffset={'2vw'} yOffset={'2vh'}>
      {productDetails ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Grid gutter="xl" px={9}>
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
                  <ProductDetails
                    product={productDetails}
                    showOptionImages={false}
                    setPropertyIsSelected={handleSetPropertyIsSelected}
                  />
                  <Button
                    type="submit"
                    loading={isAddingToCart}
                    fullWidth
                    disabled={propertyIsSelected}
                    className={addToCartButton}
                  >
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
