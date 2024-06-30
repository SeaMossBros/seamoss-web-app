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
  fontFamily: 'Palantino',
})

globalStyle('a', {
  textDecoration: 'none',
  fontFamily: 'Palantino',
})

globalStyle('.pointer-cursor', {
  cursor: 'pointer',
})
