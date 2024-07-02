import { globalStyle, style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const blogWrapper = style({
  marginTop: 0,

  '@media': {
    [`(max-height: ${defaultThemeVars.breakpoints.md})`]: {
      marginTop: 0,
      paddingTop: 0,
    },
  },
})

export const articleInputField = style({
  padding: 0,
  border: 0,
})

export const articleTitle = style({
  fontSize: 'var(--mantine-h1-font-size)',
})

export const articleIntro = style({
  fontSize: defaultThemeVars.fontSizes.md,
  marginTop: 51,
  marginBottom: 12,
})

export const contentEditorToolbar = style({
  border: 0,
  padding: 0,
})

export const contentEditorContent = style({
  minHeight: 90,
})

export const coverImageField = style({
  cursor: 'pointer',
})

export const coverImageError = style({
  border: `1px solid ${defaultThemeVars.colors.error}`,
})

globalStyle(`.${contentEditorContent} > .tiptap`, {
  padding: 0,
  fontSize: defaultThemeVars.fontSizes.md,
})
