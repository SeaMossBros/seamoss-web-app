import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const root = style({
  backgroundSize: 'cover',
  backgroundPosition: 'bottom',
  backgroundImage:
    'linear-gradient(240deg, #82c91e00 0%, #062343 81%), url(http://localhost:1337/uploads/IMG_1203_32bd46b28c.jpeg)',
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

export const inner = style({
  display: 'flex',
  justifyContent: 'space-between',
})

export const image = style({
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
      display: 'none',
    },
  },
})

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
  color: defaultThemeVars.colors['white'][1],
  opacity: 0.75,
  maxWidth: 'rem(500px)',
})

export const heroButtonContainer = style({
  display: 'flex',
  flexDirection: 'column',
})

export const control = style({
  paddingLeft: 'rem(50px)',
  paddingRight: 'rem(50px)',
  fontFamily: defaultThemeVars.fontFamily,
  fontSize: 'rem(22px)',
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      width: '42%',
      minWidth: 'fit-content',
      padding: '10px',
    },
  },
})
