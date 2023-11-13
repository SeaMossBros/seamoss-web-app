'use client'

import { AppShell, AppShellHeader, AppShellMain, AppShellNavbar } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { PropsWithChildren } from 'react'

import Header from '@/components/Header'

import NavBar from '../NavBar'
import { main } from './layout.css'

const DefaultLayout: React.FC<PropsWithChildren> = ({ children }) => {
  const [navOpened, navbar] = useDisclosure(false)

  return (
    <AppShell
      header={{
        height: 60,
      }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: {
          mobile: !navOpened,
          desktop: true,
        },
      }}
    >
      <AppShellHeader>
        <Header navOpened={navOpened} toggleNav={navbar.toggle} />
      </AppShellHeader>
      <AppShellNavbar withBorder>
        <NavBar onClose={navbar.close} />
      </AppShellNavbar>
      <AppShellMain className={main}>{children}</AppShellMain>
    </AppShell>
  )
}

export default DefaultLayout
