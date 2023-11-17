import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const card = style({
  cursor: 'pointer',
})

export const actionsContainer = style({
  position: 'absolute',
  bottom: 0,
  left: 0,
  paddingBottom: defaultThemeVars.spacing.md,
  paddingLeft: defaultThemeVars.spacing.md,
  paddingRight: defaultThemeVars.spacing.md,
  width: '100%',
})