'use client'

import { MantineProvider, useMantineColorScheme } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import { defaultTheme, defaultThemeVars } from '@/themes/default'

import CartProvider from './CartProvider'

const colorSchemeStorageKey = 'mantine-color-scheme'

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme()

  useEffect(() => {
    const getColorScheme = (): void => {
      const storedColorScheme = localStorage.getItem(colorSchemeStorageKey)
      if (storedColorScheme === 'dark' || storedColorScheme === 'light') {
        setColorScheme(storedColorScheme)
      }
    }

    getColorScheme()

    const handleColorSchemeChange = (event: StorageEvent) => {
      if (event.key === colorSchemeStorageKey && event.newValue) {
        setColorScheme(event.newValue as 'dark' | 'light')
      }
    }

    window.addEventListener('storage', handleColorSchemeChange)
    return () => window.removeEventListener('storage', handleColorSchemeChange)
  }, [setColorScheme])

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: false,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <ProgressBar
        height="2px"
        color={defaultThemeVars.colors['primary-green'][9]}
        options={{ showSpinner: false }}
        shallowRouting
      />
      <MantineProvider theme={{ ...defaultTheme, colorScheme }}>
        <ModalsProvider>
          <CartProvider>{children}</CartProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
