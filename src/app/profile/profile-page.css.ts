import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const pageCont = style({
  display: 'flex',
  position: 'relative',
  height: '100%',
  minHeight: '50vh',
  overflow: 'hidden',
  justifyContent: 'flex-end',
  paddingLeft: '0',
  paddingRight: '0',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flexDirection: 'column-reverse',
      alignItems: 'center',
    },
  },
})

export const title = style({
  fontWeight: 600,
  marginTop: 15,
})

export const updatePasswordInput = style({
  width: '100%',
})

export const updatePasswordCont = style({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  minWidth: '300px',
  maxWidth: '420px',
  flexDirection: 'column',
  marginTop: 30,
  border: '1px solid',
  padding: 21,
})
