import './globals.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

import { ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { Metadata } from 'next'

import DefaultLayout from '@/components/DefaultLayout'
import { FooterCentered } from '@/components/Footer'
import { interFont } from '@/fonts/inter'
import AppProviders from '@/providers/AppProviders'

export const metadata: Metadata = {
  title: 'SeaTheMoss',
  description: 'SeaTheMoss',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={interFont.className}>
        <AppProviders>
          <DefaultLayout>
            <Notifications />
            {children}
            <FooterCentered />
          </DefaultLayout>
        </AppProviders>
      </body>
    </html>
  )
}
