import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const wrapper = style({
  width: '100vw',
  position: 'relative',
  paddingTop: 'rem(180px)',
  paddingBottom: 'rem(130px)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: "url('/images/SeaTheMoss-Empty-Icon.png')",

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
      paddingTop: 'rem(80px)',
      paddingBottom: 'rem(50px)',
    },
  },
})

export const inner = style({
  position: 'relative',
  zIndex: '1',
})

export const title = style({
  fontWeight: '800',
  fontSize: 'rem(40px)',
  letterSpacing: 'rem(-1px)',
  paddingLeft: 'var(--mantine-spacing-md)',
  paddingRight: 'var(--mantine-spacing-md)',
  color: 'var(--mantine-color-white)',
  marginBottom: 'var(--mantine-spacing-xs)',
  textAlign: 'center',
  fontFamily: 'Palantino',
  backgroundColor: defaultThemeVars.colors.teal[9],
  padding: '3px 0',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
      fontSize: 'rem(18px)',
    },
  },
})

export const content = style({
  width: '51%',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
      width: '84%',
    },
  },
})
