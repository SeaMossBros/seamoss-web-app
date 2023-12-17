'use client'

import { Accordion, Box, Button, Grid, Stack, Title } from '@mantine/core'
import uniqBy from 'lodash/uniqBy'
import { useCallback, useMemo } from 'react'
import { FormProvider } from 'react-hook-form'

import Markdown from '@/components/Markdown'
import ProductDetails from '@/components/ProductDetails'
import ProductImages from '@/components/ProductImages'
import ProductReviews from '@/components/ProductReviews'
import { useCart } from '@/hooks/useCart'
import useProductForm from '@/hooks/useProductForm'
import { Product_Plain } from '@/types/Product'
import { ProductSelectionFormData } from '@/types/ProductForm'
import { QueryParams } from '@/types/QueryParams'

export type ProductSingleProps = {
  slug: string
  queryParams: QueryParams<Product_Plain>
}

const ProductSingle: React.FC<ProductSingleProps> = ({ slug, queryParams }) => {
  const { addToCart, isAddingToCart } = useCart()
  const { product, methods, refetch } = useProductForm(slug, queryParams)

  const onSubmit = useCallback(
    (data: ProductSelectionFormData) => {
      addToCart(data)
    },
    [addToCart],
  )

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

  const onRefetch = useCallback(() => {
    refetch()
  }, [refetch])

  if (!product) return null

  return (
    <Stack gap={64}>
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
                <ProductDetails product={product} />
                <Button type="submit" loading={isAddingToCart} fullWidth>
                  ADD TO CART
                </Button>
                <Accordion>
                  {product.attributes.ingredients ? (
                    <Accordion.Item value="ingredients">
                      <Accordion.Control>Ingredients</Accordion.Control>
                      <Accordion.Panel>
                        <Markdown>{product.attributes.ingredients}</Markdown>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ) : null}
                  {product.attributes.healthBenefits ? (
                    <Accordion.Item value="healthBenefits">
                      <Accordion.Control>Health benefits</Accordion.Control>
                      <Accordion.Panel>
                        <Markdown>{product.attributes.healthBenefits}</Markdown>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ) : null}
                  {product.attributes.certifications ? (
                    <Accordion.Item value="certifications">
                      <Accordion.Control>Certifications</Accordion.Control>
                      <Accordion.Panel>
                        <Markdown>{product.attributes.certifications}</Markdown>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ) : null}
                </Accordion>
              </Stack>
            </Grid.Col>
          </Grid>
        </form>
      </FormProvider>
      {product.attributes.description ? (
        <Box>
          <Title order={3}>Description</Title>
          <Markdown>{product.attributes.description}</Markdown>
        </Box>
      ) : null}
      <ProductReviews product={product} onRefetch={onRefetch} />
    </Stack>
  )
}

export default ProductSingle
