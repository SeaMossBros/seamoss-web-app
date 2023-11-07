'use client'

import { MantineProvider } from "@mantine/core"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { PropsWithChildren, useState } from "react"

import { defaultTheme } from "@/themes/default"

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
      }
    }
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={defaultTheme}>
        {children}
      </MantineProvider>
    </QueryClientProvider>
  )
}

export default AppProviders