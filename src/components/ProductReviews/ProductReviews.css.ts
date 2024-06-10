import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const reviewSummary = style({
  paddingBottom: defaultThemeVars.spacing.xl,
  borderBottom: `1px solid ${defaultThemeVars.colors.gray[3]}`,
})

export const reviewHeader = style({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'flex-end',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
      flexDirection: 'column',
    },
  },
})

export const reviewIndexStyle = style({
  alignSelf: 'flex-start',
})

export const reviewItem = style({
  padding: `${defaultThemeVars.spacing.xl} ${defaultThemeVars.spacing.xs}`,
  borderBottom: `1px solid ${defaultThemeVars.colors.gray[3]}`,
  display: 'flex',
})
