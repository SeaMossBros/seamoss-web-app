import { Container, Overlay, Text, Title } from '@mantine/core'
import { Metadata } from 'next'

import { inner, title, wrapper } from './hero-image-background.css'

export const metadata: Metadata = {
  title: 'Shipping Policy | SeaTheMoss',
}

const ShippingPolicyPage: React.FC = () => {
  return (
    <div>
      <div className={wrapper}>
        <div className={inner}>
          <Overlay color="#1a1b1e" opacity={0.65} zIndex={1} />
        </div>
      </div>

      <Title className={title}>Shipping & Return Policies</Title>
      <Container w={'51%'} pt={54}>
        <Text fw={700} mb={9}>
          Shipping Policy
        </Text>
        <Text fw={400}>
          Due to the nature of sea moss gel, we ONLY ship orders that contain sea moss gel
          Monday-Thursday in order to maintain the freshness and quality of your order. All other
          orders that contain only dry products, will be shipped Monday-Friday. Processing Time:
          Orders are shipped within 1-3 business days of purchase. Transit time: According to UPS,
          ground shipping is 2 to 5 business days. 10 AM EST is our cut-off time. All orders placed
          after 10 AM will be shipped next available business day, within our processing time.
        </Text>
        <br />
        <br />
        <Text fw={700} mb={9}>
          Return Policy
        </Text>
        <Text fw={400}>
          If you have any issues with your order, please contact our Customer Care team by emailing
          support@seathemoss.com within 7 days of receiving your order. Please note that due to the
          consumable nature of our products, we do not accept returns. If we determine there is
          something wrong with the product we may offer you a 50% refund due to the fact we sell
          consumable goods. We are happy to resolve any issues and provide a replacement or refund
          for any damaged or lost item. In these cases, please email a picture of the damaged item.
          Upon receipt, refunds will be processed the same day and replacement orders will be sent
          within 1-3 business days. If for any reason you change your mind about your purchase,
          please contact us BEFORE your items) are shipped. Once your item is shipped, there are no
          changes or refunds that can be issued.
        </Text>
      </Container>
    </div>
  )
}

export default ShippingPolicyPage
