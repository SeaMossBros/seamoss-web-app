import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const textLink = style({
  fontWeight: 300,
  fontFamily: defaultThemeVars.fontFamily,
  fontSize: defaultThemeVars.fontSizes.md,
})
