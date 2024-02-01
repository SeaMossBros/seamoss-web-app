import { Container, Text } from '@mantine/core'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Support | SeaTheMoss',
}

const SupportPage: React.FC = () => {
  return (
    <Container>
      <Text>Support Page</Text>
    </Container>
  )
}

export default SupportPage
