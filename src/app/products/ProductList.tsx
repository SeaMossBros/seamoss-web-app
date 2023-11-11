'use client'

import { Grid } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { PropsWithChildren, useCallback, useContext, useMemo } from "react"
import { flushSync } from "react-dom"

import ProductCard from "@/components/ProductCard"
import { useService } from "@/hooks/useService"
import { CartContext } from "@/providers/CartProvider"
import CartService from "@/services/cart.service"
import ProductService from "@/services/product.service"
import { Product } from "@/types/Product"
import { QueryParams } from "@/types/QueryParams"

const ProductCol: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Grid.Col span={{
      base: 12,
      xs: 6,
      sm: 4
    }}>
      {children}
    </Grid.Col>
  )
}

export type ProductListProps = {
  queryParams: QueryParams<Product>
}

const ProductList: React.FC<ProductListProps> = ({ queryParams }) => {
  const { cartId, setCartId } = useContext(CartContext)
  const queryClient = useQueryClient()

  const productService = useService(ProductService)
  const cartService = useService(CartService)

  const { data: products } = useQuery({
    queryKey: ProductService.queryKeys.list(queryParams),
    queryFn: () => productService.list(queryParams)
  })

  const { mutateAsync: createCart, isPending: isCreatingCart } = useMutation({
    mutationFn: () => cartService.createCart()
  })

  const { mutate: addToCart, isPending: isAddingItem } = useMutation({
    mutationFn: (data: {
      product: Product
      quantity: number
    }) => cartService.addToCart(cartId!, data.product.id, data.quantity),
    onSuccess: (_, variables) => {
      notifications.show({
        variant: 'success',
        message: `Added ${variables.product.name} to cart`
      })
      queryClient.refetchQueries({
        queryKey: CartService.queryKeys.getById(cartId!)
      })
    }
  })

  const onAddToCart = useCallback(async (product: Product) => {
    if (!cartId) {
      const cart = await createCart()
      flushSync(() => {
        setCartId(cart.data.id)
      })
    }
    addToCart({
      product,
      quantity: 1
    })
  }, [addToCart, cartId, createCart, setCartId])

  const isAddingToCart = useMemo(() => isCreatingCart || isAddingItem, [isAddingItem, isCreatingCart])

  return (
    <Grid>
      {products?.data.map(product => (
        <ProductCol key={product.id}>
          <ProductCard
            product={{
              ...product.attributes,
              id: product.id
            }}
            isAddingToCart={isAddingToCart}
            onAddToCart={onAddToCart}
          />
        </ProductCol>
      ))}
    </Grid>
  )
}

export default ProductList