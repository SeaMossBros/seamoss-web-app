import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const orderWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: defaultThemeVars.spacing.xl,
  paddingLeft: defaultThemeVars.spacing.sm,
  paddingRight: defaultThemeVars.spacing.md,
  width: 'fit-content',
  height: 'fit-content',
  minHeight: 'fit-content',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
})

export const orderStyle = style({
  position: 'relative',
  marginBottom: '30px',
  width: '60vw',
  height: '100%',
  border: '1.5px solid gray',
  padding: 12,

  selectors: {
    '&:hover': {
      borderColor: defaultThemeVars.colors.teal[9],
    },
  },
})

export const description = style({
  display: 'flex',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.lg})`]: {
      display: 'none',
    },
  },
})

export const cartItemCard = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',

  '@media': {
    [`(min-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flexDirection: 'row',
    },
  },
})
