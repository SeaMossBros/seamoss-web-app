'use client'
import { Anchor, Group, ActionIcon, rem, Image, Button } from '@mantine/core';
import { IconBrandTwitter, IconBrandYoutube, IconBrandInstagram } from '@tabler/icons-react';
import './Footer.css';
import { useEffect, useState } from 'react';

const links = [
  { link: '/support', label: 'Contact' },
  { link: '#', label: 'Privacy' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/products', label: 'Shop Products' },
  { link: '/about-us', label: 'About Us' },
];

export function FooterCentered() {
  const [spinningButtonActionText, setSpinningButtonActionText] = useState('Stop');
  const items = links.map((link) => (
    <Anchor
      c="dimmed"
      key={link.label}
      href={link.link}
      lh={1}
      // onClick={() => null}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  // useEffect(() => {
  //   console.log('clicked');
    
  // }, [setSpinningButtonActionText])

  return (
    <div 
      className={'footer'} 
    >
      <div className={'inner'}>
        <Image className={'footer-video'} src={'/videos/SeaTheMoss-Spinner-With-Wildcrafted-Raw-Extended.mp4'} />
        <Image className='footer-image' src={'/images/SeaTheMoss-StillSpinner.png'}/>
        <div className='outer-hover-menu'>
          <Button 
          className='spinner-stopper-button'
            onClick={(e) => {
              const videoEle = Array.from(document.getElementsByClassName('footer-video'))[0];
              const imgEle = Array.from(document.getElementsByClassName('footer-image'))[0];
              const footerEle = Array.from(document.getElementsByClassName('footer'))[0];

              setSpinningButtonActionText((prev) => {
                if (prev === 'Stop') {
                  videoEle.classList.add('hide-video');
                  imgEle.classList.add('display-image');
                  footerEle.classList.add('footer-border-top-change');
                  return 'Start';

                } else {
                  const target = e.currentTarget;
                  if (target) {
                    target.disabled = true;
                    setTimeout(() => {
                      target.disabled = false;
                    }, 100);
                  }
                  videoEle.classList.remove('hide-video');
                  imgEle.classList.remove('display-image');
                  footerEle.classList.remove('footer-border-top-change');
                  return 'Stop';
                }
              });
            }}
            c={spinningButtonActionText === 'Stop' ? '#a9391e' : 'primary-green'}
            variant="subtle"
            size="sm"
            mt="md"
          >
            {spinningButtonActionText} Spinning Logo
          </Button>
        </div>
        <Group className={'links'}>{items}</Group>

        <Group gap="xs" justify="flex-end" wrap="nowrap">
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandYoutube style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
}