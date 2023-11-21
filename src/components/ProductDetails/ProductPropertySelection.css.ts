import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const propertySelectionContainer = style({
  display: 'inline-block',
})

export const propertyWrapper = style({
  position: 'relative',
  padding: defaultThemeVars.spacing.sm,
  cursor: 'pointer',
  // boxShadow: defaultThemeVars.shadows.xs,
  borderWidth: 2,
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
      borderColor: defaultThemeVars.colors['primary-green'][9],
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
})

export const quantitySelectionInput = style({
  maxWidth: '100%',
  border: `1px solid ${defaultThemeVars.colors['primary-green'][9]}`,
  textAlign: 'center',
})

export const quantityControl = style({
  cursor: 'pointer',
  color: defaultThemeVars.colors['primary-green'][9],
})
