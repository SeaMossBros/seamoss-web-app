import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const userStyles = style({
  display: 'block',
  width: '100%',
  padding: defaultThemeVars.spacing.md,
  marginBottom: '12px',
})
