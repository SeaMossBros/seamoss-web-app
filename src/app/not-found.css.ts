import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const notFoundRoot = style({
  paddingTop: 'rem(80px)',
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      padding: 'rem(40px)',
      // marginBottom: '90px', // Uncomment if needed
    },
  },
})

export const notFoundTitle = style({
  fontWeight: 900,
  fontSize: defaultThemeVars.fontSizes.xl,
  marginBottom: defaultThemeVars.spacing.md,
  fontFamily: defaultThemeVars.fontFamily,
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      fontSize: defaultThemeVars.fontSizes.lg,
    },
  },
})

export const notFoundDescription = style({
  fontWeight: 300,
  fontSize: defaultThemeVars.fontSizes.md,
  fontFamily: defaultThemeVars.fontFamily,
  marginBottom: defaultThemeVars.spacing.md,
})

export const notFoundControl = style({
  marginRight: 'rem(21px)',
  height: 'fit-content',
  padding: '15px',
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      width: '42%',
      minWidth: 'fit-content',
      padding: '10px',
    },
  },
})

export const notFoundVideo = style({
  display: 'block',
})
