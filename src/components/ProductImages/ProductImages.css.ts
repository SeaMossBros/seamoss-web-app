import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const previewImage = style({
  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'transparent',

  selectors: {
    '&[data-active="true"]': {
      borderColor: defaultThemeVars.colors['primary-green'][9],
    },
  },
})
