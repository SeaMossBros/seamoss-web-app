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
  fontFamily: 'Palantino',
  fontWeight: 600,
  marginTop: 15,
  marginBottom: 15,
})

export const totalTitleStyle = style({
  fontWeight: 400,
  fontSize: '1.5em',
  marginTop: 33,
  marginBottom: 15,
  color: defaultThemeVars.colors.teal[9],
})
