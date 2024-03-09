import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const addToCartButton = style({
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      marginBottom: 30,
    },
  },
})
