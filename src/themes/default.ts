import { createTheme } from "@mantine/core";
import { Inter } from 'next/font/google'

export const interFont = Inter({
  subsets: ['latin']
})

export const defaultTheme = createTheme({
  fontFamily: interFont.style.fontFamily
})