'use client'

import { MantineProvider } from '@mantine/core'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar'
import { PropsWithChildren, useState } from 'react'

import { defaultTheme, defaultThemeVars } from '@/themes/default'

import CartProvider from './CartProvider'

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
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
      <MantineProvider theme={defaultTheme}>
        <CartProvider>{children}</CartProvider>
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default AppProviders
