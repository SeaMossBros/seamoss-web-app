import { Overlay, Title } from '@mantine/core'
import { Metadata } from 'next'

import { inner, title, wrapper } from './hero-image-background.css'

export const metadata: Metadata = {
  title: 'About Us | SeaTheMoss',
}

const AboutUsPage: React.FC = () => {
  return (
    <>
      <div className={wrapper}>
        <div className={inner}>
          <Overlay color="#1a1b1e" opacity={0.65} zIndex={1} />
        </div>
      </div>
      <Title className={title}>About Us</Title>
    </>
  )
}

export default AboutUsPage
