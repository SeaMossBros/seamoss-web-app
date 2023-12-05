'use client'

import { Button, Flex, Grid, Modal, ModalProps, Stack } from '@mantine/core'
import uniqBy from 'lodash/uniqBy'
import { useCallback, useMemo } from 'react'
import { FormProvider } from 'react-hook-form'

import { useCart } from '@/hooks/useCart'
import useProductForm from '@/hooks/useProductForm'
import { CartItem } from '@/types/CartItem'
import { ProductSelectionFormData } from '@/types/ProductForm'

import ProductDetails from '../ProductDetails'
import ProductImages from '../ProductImages'

export type CartItemUpdateModalProps = ModalProps & {
  item: CartItem
}

const CartItemUpdateModal: React.FC<CartItemUpdateModalProps> = ({ item, ...modalProps }) => {
  const { updateItem, isUpdatingItem } = useCart()

  const { product: productDetails, methods } = useProductForm(
    item?.attributes.product?.data.attributes.slug,
    {
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
    },
    {
      defaultValues: {
        variant: {
          ...item?.attributes.options?.product_variant?.data,
          quantity: item?.attributes.options?.quantity,
        },
        properties: item?.attributes.options?.properties.map((p) => ({
          ...p.product_property?.data,
          quantity: p.quantity,
        })),
        purchaseOption: item.attributes.purchase_option?.data,
      },
    },
  )

  const images = useMemo(
    () =>
      uniqBy(
        [
          ...(productDetails?.attributes.thumbnail?.data
            ? [productDetails.attributes.thumbnail.data]
            : []),
          ...(productDetails?.attributes.images?.data || []),
        ],
        'id',
      ),
    [productDetails],
  )

  const onSubmit = useCallback(
    (data: ProductSelectionFormData) => {
      if (!item) return
      updateItem(
        {
          id: item.id,
          data: {
            variant: {
              variantId: data.variant!.id,
              quantity: data.variant!.quantity,
            },
            properties: data.properties?.map((property) => ({
              propertyId: property.id,
              quantity: property.quantity,
            })),
            purchaseOptionId: data.purchaseOption!.id,
          },
        },
        {
          onSuccess: (res) => {
            if (res.error) return
            modalProps.onClose()
          },
        },
      )
    },
    [item, modalProps, updateItem],
  )

  return (
    <Modal {...modalProps} size="90%" closeOnClickOutside centered>
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
                  <Flex gap="sm">
                    <Button
                      variant="default"
                      disabled={isUpdatingItem}
                      onClick={modalProps.onClose}
                      fullWidth
                    >
                      Cancel
                    </Button>
                    <Button type="submit" loading={isUpdatingItem} fullWidth>
                      Update
                    </Button>
                  </Flex>
                </Stack>
              </Grid.Col>
            </Grid>
          </form>
        </FormProvider>
      ) : null}
    </Modal>
  )
}

export default CartItemUpdateModal
