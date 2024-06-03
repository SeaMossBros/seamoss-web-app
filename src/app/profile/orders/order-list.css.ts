import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const orderWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  paddingTop: defaultThemeVars.spacing.xl,
  paddingLeft: defaultThemeVars.spacing.sm,
  paddingRight: defaultThemeVars.spacing.md,
  width: 'fit-content',
  height: 'fit-content',
  minHeight: 'fit-content',
  maxHeight: '90vh',
  overflowY: 'auto',
  position: 'relative',
})

export const orderStyle = style({
  position: 'relative',
  marginBottom: '30px',
  width: '60vw',
  height: '100%',
  border: '1.5px solid gray',
  padding: 12,

  selectors: {
    '&:hover': {
      borderColor: defaultThemeVars.colors.teal[9],
    },
  },
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      width: '84vw',
    },
  },
})

export const description = style({
  display: 'flex',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.lg})`]: {
      display: 'none',
    },
  },
})

export const orderPrice = style({
  fontSize: defaultThemeVars.fontSizes.sm,

  '@media': {
    [`(min-width: ${defaultThemeVars.breakpoints.sm})`]: {
      fontSize: defaultThemeVars.fontSizes.xl,
    },
  },
})

export const cartItemCard = style({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',

  '@media': {
    [`(min-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flexDirection: 'row',
    },
  },
})

export const orderNumberCont = style({
  alignSelf: 'flex-start',
  minWidth: 96,
  minHeight: 42,
  maxHeight: 60,
  padding: '3px 6px',
  cursor: 'pointer',
  backgroundColor: '#8181812b',
  userSelect: 'none',

  selectors: {
    '&:hover': {
      backgroundColor: '#8181814d',
    },
  },
})

export const arrowShow = style({
  padding: 3,
})

export const dividerPrice = style({
  display: 'block',

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      display: 'none',
    },
  },
})

export const orderDateAndPriceCont = style({
  display: 'flex',
  
  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
  }, 
})