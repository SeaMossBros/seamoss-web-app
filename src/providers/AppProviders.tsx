'use client'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import React, { PropsWithChildren, useState } from 'react'

import { useSchemeManager } from '@/hooks/useSchemeManager'
import { darkTheme } from '@/themes/dark'
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
      <MantineProvider
        theme={schemeManager.get('auto') === 'dark' ? darkTheme : defaultTheme}
        defaultColorScheme={schemeManager.defaultScheme}
        colorSchemeManager={schemeManager}
      >
        <ProgressBar // TODO: progress bar is only changing color after a refresh (should change as soon as color toggle is pressed)
          height="3px"
          color={defaultThemeVars.colors.teal[9]}
          options={{ showSpinner: true }}
          shallowRouting
        />
        <ModalsProvider>
          <CartProvider>{children}</CartProvider>
        </ModalsProvider>
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default AppProviders
