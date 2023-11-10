'use client'

import { Grid } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { PropsWithChildren } from "react"

import ProductCard from "@/components/ProductCard"
import { useService } from "@/hooks/useService"
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

const ProductList: React.FC = () => {
  const productService = useService(ProductService)

  const params: QueryParams<Product> = {
    populate: ['images']
  }

  const { data: products } = useQuery({
    queryKey: ProductService.queryKeys.list(params),
    queryFn: () => productService.list(params)
  })

  return (
    <Grid>
      {products?.data.map(product => (
        <ProductCol key={product.id}>
          <ProductCard product={{
            ...product.attributes,
            id: product.id
          }} />
        </ProductCol>
      ))}
    </Grid>
  )
}

export default ProductList