import { Title, Overlay } from '@mantine/core'
import { Metadata } from 'next'
import { wrapper, inner, title } from './hero-image-background.css';

export const metadata: Metadata = {
  title: 'About Us | SeaTheMoss',
}

const AboutUsPage: React.FC = () => {
  return (
    <div className={wrapper}>
      <Overlay color="#1a1b1e" opacity={0.65} zIndex={1} />

      <div className={inner}>
        <Title className={title}>
          About Us
        </Title>
      </div>
    </div>
  );
}

export default AboutUsPage
