import { Container, Overlay, Text, Title } from '@mantine/core'

import { description, inner, title, wrapper } from './hero-image-background.css'

const HeroImage = () => {
  const SUPPORT_IMAGES = [
    'Tech-support-multiple-technicians.jpeg',
    'Technical-support-technicians-golden-hair.jpeg',
  ]

  const chooseRandomImg = () => {
    const randomIndex = Math.floor(Math.random() * SUPPORT_IMAGES.length)
    return '/images/' + SUPPORT_IMAGES[randomIndex] || '/images/placeholder.webp'
  }

  return (
    <div className={wrapper} style={{ backgroundImage: `url(${chooseRandomImg()})` }}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={inner}>
        <Title className={title}>Find the support you need</Title>

        <Container size={640}>
          <Text size="lg" className={description}>
            Reach out to us with issues or feedback you may have and we will do our best to
            accomodate your concerns!
          </Text>
        </Container>
      </div>
    </div>
  )
}

export default HeroImage
