import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const reviewSummary = style({
  paddingBottom: defaultThemeVars.spacing.xl,
  borderBottom: `1px solid ${defaultThemeVars.colors.gray[3]}`,
})

export const reviewItem = style({
  padding: `${defaultThemeVars.spacing.xl} 0`,
  borderBottom: `1px solid ${defaultThemeVars.colors.gray[3]}`,
})
