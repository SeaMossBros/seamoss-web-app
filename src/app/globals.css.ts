import { globalStyle } from '@vanilla-extract/css'

globalStyle('*', {
  boxSizing: 'border-box',
  padding: 0,
  margin: 0,
})

globalStyle('html, body', {
  maxWidth: '100vw',
  width: '100vw',
  overflowX: 'hidden',
})

globalStyle('a', {
  textDecoration: 'none',
})
