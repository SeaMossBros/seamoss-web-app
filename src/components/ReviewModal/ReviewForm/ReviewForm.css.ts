import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const attachmentUploadTrigger = style({
  width: 100,
  height: 100,
  border: `1px solid ${defaultThemeVars.colors.gray[3]}`,
  cursor: 'pointer',
  justifyContent: 'center',
})
