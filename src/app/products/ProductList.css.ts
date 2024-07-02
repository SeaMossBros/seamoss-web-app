import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const topProductsTitle = style({
  fontSize: 42,

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.lg})`]: {
      marginTop: '9vh',
    },
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      fontSize: 42,
    },
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      fontSize: 24,
    },
    [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
      fontSize: 15,
    },
  },
})

export const productsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '3vh 3vw',
  width: '100%',
  height: '100%',
})

export const filtersContainer = style({
  paddingTop: '3vh',
  marginLeft: '1vw',
  marginRight: '1vw',
})

export const pagination = style({
  paddingTop: '6vh',
  display: 'flex',
  justifyContent: 'flex-end',
})

export const chevron = style({
  selectors: {
    '&[data-rotate]': {
      transform: 'rotate(45deg)',
    },
  },
})
