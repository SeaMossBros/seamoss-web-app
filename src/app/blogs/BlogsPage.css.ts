import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const title = style({
  display: 'flex',
  marginTop: '3vh',
  marginBottom: '0',
  fontSize: '3rem',
  fontWeight: '300',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {},
  },
})

export const wrapper = style({
  width: '100%',
  height: '21vh',
  position: 'relative',
})

export const inner = style({
  width: 'auto',
  height: '21vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage:
    "url('https://balanced-creativity-f2f8470846.media.strapiapp.com/seamoss_prep_13_seamoss_bagged_f0ab2af0ae.png')",
})
