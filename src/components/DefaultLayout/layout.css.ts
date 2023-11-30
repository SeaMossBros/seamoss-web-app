import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const main = style({
  marginTop: defaultThemeVars.spacing.md,
  marginBottom: 40,
})

export const footer = style({
  position: 'sticky',
  height: 0,
})
