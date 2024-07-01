import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const topProductsTitle = style({
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.lg})`]: {
      marginTop: '9vh',
    },
  },
})

export const productsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '0 3vw',
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
