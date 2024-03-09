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
