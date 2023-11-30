import './globals.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/dropzone/styles.css'

import { ColorSchemeScript } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { Metadata } from 'next'
import { CookiesProvider } from 'next-client-cookies/server'
import React from 'react'

import DefaultLayout from '@/components/DefaultLayout'
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
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={interFont.className}>
        <CookiesProvider>
          <AppProviders>
            <DefaultLayout>
              <Notifications />
              {children}
            </DefaultLayout>
          </AppProviders>
        </CookiesProvider>
      </body>
    </html>
  )
}
