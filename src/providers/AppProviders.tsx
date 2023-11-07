'use client'

import { MantineProvider } from "@mantine/core"
import { PropsWithChildren } from "react"

import { defaultTheme } from "@/themes/default"

const AppProviders: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <MantineProvider theme={defaultTheme}>{children}</MantineProvider>
  )
}

export default AppProviders