import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const wrapper = style({
  display: 'flex',
  // backgroundColor: 'light-dark(var(--mantine-color-white), var(--mantine-color-dark-8))',
  // borderRadius: 'var(--mantine-radius-lg)',
  padding: 'rem(12px)',
  // border: 'rem(1px) solid light-dark(var(--mantine-color-gray-2), var(--mantine-color-dark-8))',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flexDirection: 'column',
      alignItems: 'center',
      padding: 0,
    },
  },
})

export const form = style({
  flex: '1',
  padding: 'var(--mantine-spacing-xl)',
  paddingLeft: ' calc(var(--mantine-spacing-xl) * 2)',
  borderLeft: 0,
  marginLeft: '15px',
  minWidth: '50vw',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      paddingTop: 'var(--mantine-spacing-md)',
      paddingLeft: 'var(--mantine-spacing-md)',
      minWidth: '90vw',
    },
  },
})

export const fields = style({
  marginTop: 'rem(-12px)',
})

export const fieldInput = style({
  flex: '1',
  marginLeft: 'var(--mantine-spacing-md)',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      marginLeft: '0',
      marginTop: 'var(--mantine-spacing-md)',
    },
  },
})

export const fieldsGroup = style({
  display: 'flex',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flexDirection: 'column',
    },
  },
})

export const contacts = style({
  boxSizing: 'border-box',
  position: 'relative',
  borderRadius: 'var(--mantine-radius-lg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  border: 'rem(1px) solid transparent',
  padding: 'var(--mantine-spacing-xl)',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      marginBottom: 'var(--mantine-spacing-sm)',
      paddingLeft: 'var(--mantine-spacing-md)',
    },
  },
})

export const title = style({
  marginBottom: 'calc(var(--mantine-spacing-xl) * 1.5)',
  fontFamily: 'Palantino',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      marginBottom: 'var(--mantine-spacing-xl)',
    },
  },
})

export const control = style({
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flex: '1',
    },
  },
})
