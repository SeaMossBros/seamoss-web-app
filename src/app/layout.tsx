import './globals.css'
import '@mantine/core/styles.css';

import { ColorSchemeScript } from '@mantine/core';
import type { Metadata } from 'next'

import AppProviders from '@/providers/AppProviders';

export const metadata: Metadata = {
  title: 'SeaTheMoss',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  )
}
