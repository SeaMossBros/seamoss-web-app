import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const variantSelectionContainer = style({
  display: 'inline-block',
  maxWidth: '90px',
})

export const variantWrapper = style({
  position: 'relative',
  height: 'fit-content',
  padding: defaultThemeVars.spacing.sm,
  cursor: 'pointer',
  // boxShadow: defaultThemeVars.shadows.xs,
  ':hover': {
    boxShadow: defaultThemeVars.shadows.md,
  },
  selectors: {
    '&[data-selected="true"]': {
      borderColor: defaultThemeVars.colors['teal'][9],
      boxShadow: 'none',
    },
  },
})

export const quantitySelection = style({
  flexGrow: 1,
  width: 0,
  minWidth: '75px',
})

export const quantitySelectionInput = style({
  maxWidth: '100%',
  textAlign: 'center',
})

export const quantityControl = style({
  cursor: 'pointer',
  margin: '0 6px',
})
