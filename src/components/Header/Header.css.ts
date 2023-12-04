import { style } from '@vanilla-extract/css'

export const container = style({
  height: '100%',
})

export const wrapper = style({
  height: '100%',
})

export const navLinkContainer = style({
  flexGrow: 1,
  justifyContent: 'flex-end',
})

export const logoContainer = style({
  flex: 1,
  display: 'flex',
  gap: 10,
})

export const navLink = style({
  textAlign: 'center',
  width: 'fit-content',
})

export const cartIcon = style({
  margin: 'auto',
})
