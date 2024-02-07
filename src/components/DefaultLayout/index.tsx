'use client'
import {
  AppShell,
  AppShellFooter,
  AppShellHeader,
  AppShellMain,
  AppShellNavbar,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import React, { PropsWithChildren } from 'react'

import FooterCentered from '@/components/FooterCentered'
import Header from '@/components/Header'

import NavBar from '../NavBar'
import { footer, main } from './layout.css'

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [navOpened, navbar] = useDisclosure(false)

  return (
    <AppShell
      header={{
        height: 60,
      }}
      navbar={{
        width: 200,
        breakpoint: 'md',
        collapsed: {
          mobile: !navOpened,
          desktop: true,
        },
      }}
      transitionDuration={300}
      footer={{
        height: '54vh',
      }}
    >
      <AppShellHeader>
        <Header navOpened={navOpened} toggleNav={navbar.toggle} />
      </AppShellHeader>
      <AppShellNavbar withBorder>
        <NavBar onClose={navbar.close} />
      </AppShellNavbar>
      <AppShellMain className={main}>{children}</AppShellMain>
      <AppShellFooter className={footer}>
        <FooterCentered />
      </AppShellFooter>
    </AppShell>
  )
}

export default DefaultLayout
