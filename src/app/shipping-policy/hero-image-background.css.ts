import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const wrapper = style({
  width: '100%',
  height: '21vh',
  position: 'relative',
})

export const inner = style({
  width: 'auto',
  height: '21vh',
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundImage: "url('/images/SeaTheMoss-Empty-Icon.png')",
})

export const title = style({
  fontWeight: '800',
  fontSize: 'rem(40px)',
  letterSpacing: 'rem(-1px)',
  paddingLeft: 'var(--mantine-spacing-md)',
  paddingRight: 'var(--mantine-spacing-md)',
  marginBottom: 'var(--mantine-spacing-xs)',
  textAlign: 'center',
  fontFamily: 'Palantino',
  marginTop: '1em',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
      fontSize: 'rem(18px)',
      textAlign: 'left',
    },
  },
})
