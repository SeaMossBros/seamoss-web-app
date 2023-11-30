import { globalStyle, style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const articleInputField = style({
  padding: 0,
  border: 0,
})

export const articleTitle = style({
  fontSize: 'var(--mantine-h1-font-size)',
})

export const articleIntro = style({
  fontSize: defaultThemeVars.fontSizes.md,
  fontWeight: 600,
})

export const contentEditorToolbar = style({
  border: 0,
  padding: 0,
})

export const contentEditorContent = style({})

globalStyle(`.${contentEditorContent} > .tiptap`, {
  padding: 0,
  fontSize: defaultThemeVars.fontSizes.md,
})
