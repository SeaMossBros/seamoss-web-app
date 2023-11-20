import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const inner = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: defaultThemeVars.spacing.sm,
  position: 'relative',
  margin: '0 3%',
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flexDirection: 'column',
    },
  },
})

export const footerImage = style({
  width: '42%',
  maxWidth: '350px',
  maxHeight: '150px',
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
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '9%',
  minWidth: '120px',
  maxWidth: '130px',
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      marginBottom: defaultThemeVars.spacing.xl,
    },
  },
})
