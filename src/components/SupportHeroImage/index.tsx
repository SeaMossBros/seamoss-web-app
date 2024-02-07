import { Title, Text, Container, Overlay } from '@mantine/core';
import { wrapper, inner, title, highlight, description } from './hero-image-background.css';
// import { useSupportPage } from '@/queries/useSupportPage';
// import { useMemo } from 'react';
// import { getStrapiUploadUrl } from '@/utils/cms';
// import { useHomePage } from '@/queries/useHomePage';

const HeroImage = () => {
    // const { data } = useSupportPage();

    // const SUPPORT_IMAGES = useMemo(() => {
    //     return data?.attributes.hero_images?.data ?? []
    // }, [data?.attributes.hero_images?.data])
    const SUPPORT_IMAGES = [
        'Tech-support-multiple-technicians.jpeg',
        'Technical-support-technicians-golden-hair.jpeg'
    ];

    const chooseRandomImg = () => {
        const randomIndex = Math.floor(Math.random() * SUPPORT_IMAGES.length);
        // cnsole.log('SUPPORT_IMAGES', SUPPORT_IMAGES[0]);
        return '/images/' + SUPPORT_IMAGES[randomIndex] || '/images/placeholder.webp';
    }

    // console.log('first url:::', getStrapiUploadUrl(SUPPORT_IMAGES[0])); // .attributes.url

    return (
        <div className={wrapper} style={{ backgroundImage: `url(${chooseRandomImg()})` }}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={inner}>
                <Title className={title}>
                    Find the support you need
                </Title>

                <Container size={640}>
                    <Text size="lg" className={description}>
                        Reach out to us with issues or feedback you may have 
                        and we will do our best to accomodate your concerns! 
                    </Text>
                </Container>
            </div>
        </div>
    );
}

export default HeroImage;