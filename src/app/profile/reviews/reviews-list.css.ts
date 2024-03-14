import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const reviewsWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: defaultThemeVars.spacing.xl,
  paddingLeft: defaultThemeVars.spacing.sm,
  paddingRight: defaultThemeVars.spacing.md,
  width: '100%',
  height: 'fit-content',
  minHeight: 'fit-content',
  position: 'relative',
})

export const reviewStyle = style({
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
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      width: '81vw',
    },
  },
})
