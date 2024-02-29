'use client'
import { ActionIcon, Anchor, Group, Image, Text } from '@mantine/core'
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react'
import React from 'react'

import { externalFooterLinks, footerImage, footerLinks, inner, rightsReserved } from './Footer.css'

const links = [
  { link: '/products', label: 'Shop Products' },
  { link: '/support', label: 'Contact Support' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/about-us', label: 'About Us' },
  { link: '/privacy-policy', label: 'Privacy Policy' },
  { link: '/fda-disclaimer', label: 'FDA Disclaimer' },
  { link: '/terms-of-service', label: 'Terms Of Service' },
]

const FooterCentered = () => {
  const items = links.map((link, i) => (
    <Text key={link.label}>
      <Anchor
        c="dimmed" 
        href={link.link}
        lh={1}
        size="sm"
        inline
        px={0}
        mx={0}
      >
        {link.label}
      </Anchor>
      {i + 1 !== links.length && (
        <Text size='xs' lh={0.6} span inline c='dimmed' ml={4}>
          {' | '}
        </Text>
      )}
    </Text>
  ))

  return (
    <Group w={'100vw'} display={'flex'} justify='center' style={{ flexDirection: 'column', alignItems: 'flex-start'}}>
      <div className={inner}>
        <Image
          className={footerImage}
          src={'/images/SeaTheMoss-StillSpinner.svg'}
          alt="footer logo"
        />
          
        <Group className={footerLinks}>{items}</Group>

        <Group className={externalFooterLinks} gap="xs" justify="flex-end" wrap="nowrap">
          {/* <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandTwitter style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon> */}
          <Anchor
            c="dimmed"
            href={'https://www.youtube.com/channel/UCdRAVki3AJLRUyi2sg-SliA'}
            lh={1}
            size="sm"
            target="_blank"
            >
            <ActionIcon size="lg" variant="default" radius="xl">
              <IconBrandYoutube style={{ width: 18, height: 18 }} stroke={1.5} />
            </ActionIcon>
          </Anchor>
          {/* <ActionIcon size="lg" variant="default" radius="xl">
            <IconBrandInstagram style={{ width: 18, height: 18 }} stroke={1.5} />
          </ActionIcon> */}
        </Group>
      </div>
      <Text size='xs' lh={0.6} span inline c='dimmed' className={rightsReserved}>
        © 2024. SeaTheMoss LLC. All Rights Reserved
      </Text>
    </Group>
  )
}

export default FooterCentered
