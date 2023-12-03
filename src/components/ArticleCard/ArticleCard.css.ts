import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const card = style({
  cursor: 'pointer',
  height: 300,

  ':hover': {
    boxShadow: defaultThemeVars.shadows.lg,
  },
})
