'use client'
import { ActionIcon, Anchor, Center, Flex, Group, Text, useMantineColorScheme } from '@mantine/core'
import { IconBrandYoutube } from '@tabler/icons-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import { ROUTE_PATHS } from '@/consts/route-paths'

import { companyInfo, externalFooterLinks, footerImage, footerLinks, inner } from './Footer.css'

const links = [
  { link: '/products', label: 'Shop Products' },
  { link: '/support', label: 'Contact Support' },
  { link: '/blogs', label: 'Blogs' },
  { link: '/about-us', label: 'About Us' },
  { link: '/privacy-policy', label: 'Privacy Policy' },
  { link: '/fda-disclaimer', label: 'FDA Disclaimer' },
  { link: '/terms-of-service', label: 'Terms Of Service' },
  { link: '/shipping-policy', label: 'Shipping Policy' },
]

const FooterCentered = () => {
  const router = useRouter()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'
  const items = links.map((link, i) => (
    <Text key={link.label}>
      <Anchor c="dimmed" href={link.link} lh={1} size="sm" inline px={0} mx={0}>
        {link.label}
      </Anchor>
      {i + 1 !== links.length && (
        <Text size="xs" lh={0.6} span inline c="dimmed" ml={4}>
          {' | '}
        </Text>
      )}
    </Text>
  ))

  return (
    <Group
      w={'100vw'}
      display={'flex'}
      justify="center"
      style={{ flexDirection: 'column', alignItems: 'flex-start' }}
    >
      <div className={inner}>
        <Image
          className={footerImage}
          width={81}
          height={81}
          src={'/images/SeaTheMoss-StillSpinner.svg'}
          alt="footer logo"
          onClick={() => router.push(ROUTE_PATHS.HOME)}
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
      <Center w={'100vw'}>
        <Flex align={'center'} my={42} className={companyInfo}>
          <Text ml={21} fw={200} fz={'xs'} style={{ display: 'flex', alignItems: 'center' }}>
            powered by
            <Image
              src={`/images/icons8-stripe-${isDarkTheme ? '64' : '50'}.png`}
              height={33}
              width={33}
              alt="stripe-icon"
              onClick={() => router.push('https://stripe.com')}
              style={{ cursor: 'pointer', marginLeft: 9 }}
            />
          </Text>
          <Text size="xs" lh={0.6} span inline c="dimmed">
            © 2024. SeaTheMoss LLC. All Rights Reserved
          </Text>
        </Flex>
      </Center>
    </Group>
  )
}

export default FooterCentered
