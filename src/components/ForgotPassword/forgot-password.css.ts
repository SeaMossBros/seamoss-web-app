import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const forgotPassword = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  minWidth: '300px',
  maxWidth: '501px',
  flexDirection: 'column',
  marginTop: 30,
  border: '1px solid',
  padding: 21,

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      width: '90%',
    },
  },
})
