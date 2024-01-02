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
    teal: generateColors('#087F5B'), // teal
    cyan: generateColors('#0B7285'), // cyan
    lime: generateColors('#5C940D'), // lime
    orange: generateColors('#D9480F'), // orange
    grape: generateColors('#862E9C'), // grape
    red: generateColors('#C92A2A'), // red
    gray: generateColors('#212529'), // gray
    blue: generateColors('#1864AB'), // blue
    pink: generateColors('#A61E4D'), // pink
  },
  primaryColor: 'teal',
  primaryShade: {
    light: 6,
    dark: 9,
  },
  components: {
    Container: {
      defaultProps: {
        size: 'xl',
      },
    },
    Indicator: {
      defaultProps: {
        zIndex: 1,
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
  defaultGradient: {
    from: 'white',
    to: 'teal',
    deg: 45
  },
  defaultRadius: 9
  // fontSizes: {
  //   xs: '9px',
  //   sm: '15px',
  //   md: '21px',
  //   lg: '33px',
  //   xl: '42px',
  // },
})

export const defaultThemeVars = themeToVars(defaultTheme)
