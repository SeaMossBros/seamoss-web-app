import { Container, Overlay, Text, Title } from '@mantine/core'
import { Metadata } from 'next'

import { content, inner, title, wrapper } from './hero-image-background.css'

export const metadata: Metadata = {
  title: 'FDA Disclaimer | SeaTheMoss',
}

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div>
      <div className={wrapper}>
        <Overlay color="#1a1b1e" opacity={0.65} zIndex={1} />

        <div className={inner}>
          <Title className={title}>FDA Disclaimer</Title>
        </div>
      </div>
      <Container pt={54} className={content}>
        <Text fw={400}>
          These statements have not been evaluated by the Food and Drug Administration (FDA). This
          product is not intended to diagnose, treat, cure, or prevent any disease. sea moss is an
          amazing superfood but in reality, it may not be best for everyone. Please understand that
          we, SeaTheMoss, do not claim sea moss will heal or cure any disease you may be
          experiencing. Therefore, we are not responsible if sea moss does not work for you or if
          you do not like sea moss. However, we do recommend that you consult with your primary
          physician before taking sea moss, to see if sea moss is right for you especially if you
          have any major health issues.
          <br />
          <br />
          SeaTheMoss
        </Text>
      </Container>
    </div>
  )
}

export default PrivacyPolicyPage
