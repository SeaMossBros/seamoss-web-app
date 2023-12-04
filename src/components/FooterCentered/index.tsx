'use client'
import { ActionIcon, Anchor, Group, Image } from '@mantine/core'
import { IconBrandInstagram, IconBrandTwitter, IconBrandYoutube } from '@tabler/icons-react'
import React from 'react'

import { externalFooterLinks, footerImage, footerLinks, inner } from './Footer.css'

const links = [
  { link: '/support', label: 'Contact' },
  // { link: '#', label: 'Privacy' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/products', label: 'Shop Products' },
  { link: '/about-us', label: 'About Us' },
  { link: '/login', label: 'Login' },
]

const FooterCentered = () => {
  // const [spinningButtonActionText, setSpinningButtonActionText] = useState('Stop')
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
  ))

  return (
    <div className={inner}>
      <Image
        className={footerImage}
        src={'/images/SeaTheMoss-StillSpinner.svg'}
        alt="footer logo"
      />
      <Group className={footerLinks}>{items}</Group>

      <Group className={externalFooterLinks} gap="xs" justify="flex-end" wrap="nowrap">
        <ActionIcon size="lg" variant="default" radius="xl">
          <IconBrandTwitter style={{ width: 18, height: 18 }} stroke={1.5} />
        </ActionIcon>
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
        <ActionIcon size="lg" variant="default" radius="xl">
          <IconBrandInstagram style={{ width: 18, height: 18 }} stroke={1.5} />
        </ActionIcon>
      </Group>
    </div>
  )
}

export default FooterCentered
