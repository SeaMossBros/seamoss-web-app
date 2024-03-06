import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const navLink = style({
  textAlign: 'start',
  border: `1px solid ${defaultThemeVars.colors.gray[6]}`,
})

export const navLinkContClosed = style({
  boxShadow: 'none',
  borderBottom: `1px solid ${defaultThemeVars.colors.gray[6]}`,
})

export const navLinkContOpened = style({
  boxShadow: `0px 9px 27px -8px ${defaultThemeVars.colors.gray[7]}`,
  display: 'flex',
  alignItems: 'center',
  borderBottom: `1px solid ${defaultThemeVars.colors.gray[6]}`,
})
