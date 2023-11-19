import React from 'react';
import { Title, Text, Button, Anchor } from '@mantine/core';
import TextLink from '../TextLink'
import './HeroImage.css';

const HeroImage = () => {
  return (
    <div className={'root'}>
        <div className={'inner'}>
            <div className={'content'}>
                <Title className={'title'}>
                    Explore Earth's Oceanic Wonders with {' '}
                    <Text
                        component="span"
                        inherit
                        variant="gradient"
                        gradient={{ from: 'blue', to: 'orange' }}
                    >
                        Sea The Moss
                    </Text>{' '}
                    Products
                </Title>

                <Text className={'description'} mt={30}>
                    Discover our pure sea moss in gel, dried, and gummy form
                    <br />
                    Grown in the clean ocean waters of Belize
                </Text>

                <div className='hero-button-container'>
                    <Anchor
                        href={'/products'}
                        lh={1}
                    >
                        <Button
                            variant="filled"
                            className={'control'}
                            mt={40}
                            size='md'
                        >
                            Shop Products
                        </Button>
                    </Anchor>
                    <Anchor
                        href={'/about-us'}
                        lh={1}
                    >
                        <Button
                            variant='outline'
                            className={'control'}
                            mt={40}
                            size='md'
                        >
                            Why Our Sea Moss?
                        </Button>
                    </Anchor>
                </div>
            </div>
        </div>
    </div>
  );
}

export default HeroImage;
