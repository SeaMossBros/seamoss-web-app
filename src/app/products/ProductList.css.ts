import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const productsContainer = style({
  padding: '3vh 5vw',
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      paddingTop: '9vh',
    },
  }, 
})

export const filtersContainer = style({
  paddingTop: '3vh',
  paddingLeft: '3vh'
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
