import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const cartItemWrapper = style({
  display: 'flex',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
      flexDirection: 'column-reverse',
    },
  },
})

export const bottomCheckoutButton = style({
  display: 'none',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      display: 'block',
    },
  },
})

export const productImg = style({
  flex: 1,
  maxWidth: 70,
})

export const itemInfoWrapper = style({
  flexGrow: 1,
})

export const priceInfoWrapper = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
})
