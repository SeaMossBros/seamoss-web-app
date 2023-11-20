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
    white: generateColors('#fff'),
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
  },
  breakpoints: {
    xs: '36em',
    sm: '48em',
    md: '62em',
    lg: '75em',
    xl: '88em',
  },
  spacing: {
    xs: '2px',
    sm: '9px',
    md: '12px',
    lg: '15px',
    xl: '20px',
  },
  fontFamily: 'Greycliff CF',
  fontSizes: {
    xs: '9px',
    sm: '15px',
    md: '21px',
    lg: '33px',
    xl: '42px',
  },
})

export const defaultThemeVars = themeToVars(defaultTheme)
