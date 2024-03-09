import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const card = style({
  cursor: 'pointer',
  height: 'fit-content',
  minHeight: 300,
  boxShadow: `0px 9px 12px -9px ${defaultThemeVars.colors.gray[9]}`,

  ':hover': {
    boxShadow: `0px 9px 12px -6px ${defaultThemeVars.colors.teal[9]}`,
  },

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      minHeight: 210,
    },
  },
})
