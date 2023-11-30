'use client'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import React, { lazy, PropsWithChildren, useEffect, useState } from 'react'

import { useSchemeManager } from '@/hooks/useSchemeManager'
import { defaultTheme, defaultThemeVars } from '@/themes/default'

import CartProvider from './CartProvider'

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools').then((d) => ({
    default: d.ReactQueryDevtools,
  })),
)

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const schemeManager = useSchemeManager()
  const [showDevtools, setShowDevtools] = React.useState(false)
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

  useEffect(() => {
    // @ts-expect-error add trigger for react-query devtools
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

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
      <ReactQueryDevtools initialIsOpen={false} />
      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </QueryClientProvider>
  )
}

export default AppProviders
