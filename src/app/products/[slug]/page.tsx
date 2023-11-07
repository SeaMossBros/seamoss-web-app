import { Container, Text } from "@mantine/core"

type ProductDetailPageProps = {
  params: {
    slug: string
  }
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ params }) => {

  return (
    <Container>
      <Text>Product Detail Page</Text>
      <Text>Slug: {params.slug}</Text>
    </Container>
  )
}

export default ProductDetailPage