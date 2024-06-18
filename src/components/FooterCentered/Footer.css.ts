import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const inner = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: defaultThemeVars.spacing.sm,
  position: 'relative',
  width: '100%',
  marginTop: 42,

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flexDirection: 'column',
      marginTop: 12,
    },
  },
})

export const footerImage = style({
  display: 'flex',
  width: '24%',
})

export const hideVideo = style({
  display: 'none',
})

export const displayImage = style({
  display: 'block',
})

export const outerHoverMenu = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: '0.4s ease-in-out',
  '@media': {
    [`(min-width: ${defaultThemeVars.breakpoints.md})`]: {
      flexDirection: 'row',
    },
  },
})

export const spinnerStopperButton = style({
  paddingTop: 0,
  marginTop: 0,
  opacity: 0.12,
  transition: '0.3s ease-in-out',
  ':hover': {
    opacity: 1,
  },
})

export const footerLinks = style({
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      marginTop: defaultThemeVars.spacing.xl,
      marginBottom: defaultThemeVars.spacing.xl,
      display: 'flex',
      justifyContent: 'center',
    },
  },
})

export const externalFooterLinks = style({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '12%',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      justifyContent: 'center',
    },
  },
})

export const companyInfo = style({
  height: 60,
  flexDirection: 'column',
  justifyContent: 'space-between',
})
