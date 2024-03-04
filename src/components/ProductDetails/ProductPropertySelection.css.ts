import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const propertySelectionContainer = style({
  display: 'inline-block',
})

export const propertyWrapper = style({
  position: 'relative',
  padding: defaultThemeVars.spacing.sm,
  cursor: 'pointer',
  borderWidth: 1,
  borderStyle: 'solid',
  ':hover': {
    boxShadow: defaultThemeVars.shadows.md,
  },
  selectors: {
    '&[data-withImage="true"]': {
      minHeight: 125,
      width: 100,
    },
    '&[data-selected="true"]': {
      borderColor: defaultThemeVars.colors['teal'][9],
      boxShadow: 'none',
    },
    '&[data-disabled="true"]': {
      pointerEvents: 'none',
    },
  },
})

export const quantitySelection = style({
  flexGrow: 1,
  width: 0,
  borderRadius: defaultThemeVars.radiusDefault,
  minWidth: '60px',

  ':hover': {
    boxShadow: defaultThemeVars.shadows.md,
  },
})

export const quantitySelectionInput = style({
  maxWidth: '100%',
  textAlign: 'center',
})

export const quantityControl = style({
  cursor: 'pointer',
  margin: '0 4px',
})
