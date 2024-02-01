import { Container, Text } from '@mantine/core'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | SeaTheMoss',
}

const AboutUsPage: React.FC = () => {
  return (
    <Container>
      <Text>About Us Page</Text>
    </Container>
  )
}

export default AboutUsPage
