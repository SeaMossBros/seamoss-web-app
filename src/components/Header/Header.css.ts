import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const container = style({
  height: '100%',
})

export const wrapper = style({
  height: '100%',
})

export const navLinkContainer = style({
  flexGrow: 1,
  justifyContent: 'flex-end',
})

export const logoContainer = style({
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  gap: 9,
})

export const appTitle = style({
  fontSize: 33,

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.lg})`]: {
      fontSize: 27,
    },
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      fontSize: 24,
    },
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      fontSize: 21,
    },
  },
})

export const navLink = style({
  textAlign: 'center',
  width: 'fit-content',
})

export const cartIcon = style({
  margin: 'auto',
})
