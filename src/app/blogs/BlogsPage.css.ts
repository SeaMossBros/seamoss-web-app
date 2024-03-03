import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const title = style({
  display: 'flex',
  marginTop: '3vh',
  marginBottom: '3vh',
  fontSize: '4rem',
  fontWeight: '300',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {},
  },
})
