import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const productsWrapper = style({
  padding: '3vh 5vw',
  width: '100%',
  height: '100%',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      padding: '2vh 9vw',
    },
  },
})
