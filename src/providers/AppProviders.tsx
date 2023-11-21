'use client'

import { MantineColorScheme, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import React, { PropsWithChildren, useEffect, useState } from 'react'

import { defaultTheme, defaultThemeVars } from '@/themes/default'

import CartProvider from './CartProvider'

const colorSchemeStorageKey = 'mantine-color-scheme'

const getColorScheme = (): MantineColorScheme => {
  return (window.localStorage.getItem(colorSchemeStorageKey) as MantineColorScheme) || 'light'
}

const setColorScheme = (value: MantineColorScheme) => {
  window.localStorage.setItem(colorSchemeStorageKey, value)
}

const colorSchemeManager = {
  get: getColorScheme,
  set: setColorScheme,
  subscribe: (onUpdate: (colorScheme: MantineColorScheme) => void) => {
    const storageListener = (event: StorageEvent) => {
      if (event.key === colorSchemeStorageKey && event.newValue) {
        onUpdate(event.newValue as MantineColorScheme)
      }
    }

    window.addEventListener('storage', storageListener)
    return () => window.removeEventListener('storage', storageListener)
  },
  unsubscribe: () => {},
  clear: () => window.localStorage.removeItem(colorSchemeStorageKey),
}

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const [_, setColorScheme] = useState<MantineColorScheme>(getColorScheme())

  // const toggleColorScheme = useCallback(() => {
  //   setColorScheme((prevColorScheme) => {
  //     const newScheme = prevColorScheme === 'dark' ? 'light' : 'dark'
  //     colorSchemeManager.set(newScheme)
  //     return newScheme
  //   })
  // }, [])

  useEffect(() => {
    const unsubscribe = colorSchemeManager.subscribe(setColorScheme)
    return () => unsubscribe()
  }, [])

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
      <MantineProvider theme={defaultTheme} colorSchemeManager={colorSchemeManager}>
        <ModalsProvider>
          <CartProvider>{children}</CartProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
