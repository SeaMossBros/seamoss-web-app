'use client'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import React, { PropsWithChildren, useState } from 'react'

import { useSchemeManager } from '@/hooks/useSchemeManager'
import { defaultTheme, defaultThemeVars } from '@/themes/default'

import CartProvider from './CartProvider'

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const schemeManager = useSchemeManager()
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
      <MantineProvider
        theme={defaultTheme}
        defaultColorScheme={schemeManager.defaultScheme}
        colorSchemeManager={schemeManager}
      >
        <ModalsProvider>
          <CartProvider>{children}</CartProvider>
        </ModalsProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
