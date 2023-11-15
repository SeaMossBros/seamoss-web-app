'use client'

import { Grid } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useQuery } from '@tanstack/react-query'
import { PropsWithChildren, useCallback, useState } from 'react'

import ProductCard from '@/components/ProductCard'
import ProductPreviewModal from '@/components/ProductPreviewModal'
import { useService } from '@/hooks/useService'
import ProductService from '@/services/product.service'
import { Product } from '@/types/Product'
import { QueryParams } from '@/types/QueryParams'
import { WithMetadata } from '@/types/QueryResponse'

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
  queryParams: QueryParams<Product>
}

const ProductList: React.FC<ProductListProps> = ({ queryParams }) => {
  // const { cartId, setCartId } = useContext(CartContext)
  // const queryClient = useQueryClient()

  const productService = useService(ProductService)
  // const cartService = useService(CartService)

  const [selectedProduct, setSelectedProduct] = useState<WithMetadata<Product> | null>(null)
  const [productPreviewOpened, productPreview] = useDisclosure(false, {
    onClose: () => {
      setSelectedProduct(null)
    },
  })

  const { data: products } = useQuery({
    queryKey: ProductService.queryKeys.list(queryParams),
    queryFn: () => productService.list(queryParams),
  })

  // const { mutateAsync: createCart, isPending: isCreatingCart } = useMutation({
  //   mutationFn: () => cartService.createCart(),
  // })

  // const { mutate: addToCart, isPending: isAddingItem } = useMutation({
  //   mutationFn: (data: { product: Product; quantity: number }) =>
  //     cartService.addToCart(cartId!, data.product.id, data.quantity),
  //   onSuccess: (_, variables) => {
  //     notifications.show({
  //       variant: 'success',
  //       message: `Added ${variables.product.name} to cart`,
  //     })
  //     queryClient.refetchQueries({
  //       queryKey: CartService.queryKeys.getById(cartId!),
  //     })
  //   },
  // })

  const onAddToCart = useCallback(
    async (product: WithMetadata<Product>) => {
      // if (!cartId) {
      //   const cart = await createCart()
      //   flushSync(() => {
      //     setCartId(cart.data!.id)
      //   })
      // }
      // addToCart({
      //   product,
      //   quantity: 1,
      // })
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
