import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const root = style({
  position: 'relative',
  paddingTop: `calc(${defaultThemeVars.spacing.xl} * 3)`,
  paddingLeft: `calc(${defaultThemeVars.spacing.xl} * 3)`,
  paddingBottom: `calc(${defaultThemeVars.spacing.xl} * 3)`,

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      paddingLeft: `calc(${defaultThemeVars.spacing.xl} * 2)`,
    },
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      paddingLeft: `calc(${defaultThemeVars.spacing.xl} * 1)`,
    },
  },
})

export const container = style({
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100%',
  color: '#f5f5f5',
})

export const slideImage = style({
  filter: 'brightness(80%)',
  objectFit: 'cover',
})

export const inner = style({
  position: 'relative',
  display: 'flex',
  justifyContent: 'space-between',
  // zIndex: 2,
})

// export const image = style({
//   '@media': {
//     [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
//       display: 'none',
//     },
//   },
// })

export const content = style({
  paddingBottom: `calc(${defaultThemeVars.spacing.xl} * 2)`,
  marginRight: `calc(${defaultThemeVars.spacing.xl} * 3)`,

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      width: '81vw',
    },
  },
})

export const title = style({
  color: defaultThemeVars.colors['white'][0],
  fontFamily: defaultThemeVars.fontFamily,
  fontWeight: 900,
  lineHeight: 1.05,
  maxWidth: 'rem(500px)',
  fontSize: 'rem(48px)',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      fontSize: 'rem(34px)',
      lineHeight: 1.15,
    },
  },
})

export const description = style({
  backgroundColor: defaultThemeVars.colors['white'][1],
  color: defaultThemeVars.colors['teal'][9],
  fontFamily: defaultThemeVars.fontFamily,
  fontSize: defaultThemeVars.fontSizes.lg,
  opacity: 0.75,
  maxWidth: 'rem(500px)',
  marginTop: 30,

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      backgroundColor: 'transparent',
      color: 'transparent',
      marginTop: 0,
      height: 0,
    },
  },
})

export const heroButtonContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      marginTop: 64,
    },
  },
})

export const actionButtons = style({
  paddingLeft: 'rem(50px)',
  paddingRight: 'rem(50px)',
  fontFamily: defaultThemeVars.fontFamily,
  fontSize: 'rem(22px)',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  width: 'fit-content',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      padding: '10px',
    },
  },
})
