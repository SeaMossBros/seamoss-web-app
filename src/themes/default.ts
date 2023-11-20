'use client'

import { generateColors } from '@mantine/colors-generator'
import { createTheme, rem } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'

// import { interFont } from '@/fonts/inter'

export const defaultTheme = createTheme({
  // fontFamily: interFont.style.fontFamily,
  radius: {
    lg: rem(0),
    md: rem(0),
    sm: rem(0),
    xl: rem(0),
    xs: rem(0),
  },
  colors: {
    'primary-green': generateColors('#026055'),
    'primary-gray': generateColors('#778490'),
    'secondary-blue': generateColors('#20BFDB'),
    'secondary-pink': generateColors('#E5BDAC'),
    'secondary-gray': generateColors('#A2ADA6'),
    'coral-red': generateColors('#a9391e'),
  },
  primaryColor: 'primary-green',
  primaryShade: 9,
  components: {
    Container: {
      defaultProps: {
        size: 'lg',
      },
    },
    Indicator: {
      defaultProps: {
        zIndex: 1,
      },
    },
  },
})

export const defaultThemeVars = themeToVars(defaultTheme)
