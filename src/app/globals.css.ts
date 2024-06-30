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

globalStyle('.markdown-content img', {
  display: 'block',
  margin: '30px auto',
  maxWidth: '100%',
  maxHeight: '333px',
  height: 'auto',
  boxShadow: '1px 1px 9px -5px gray',
  borderRadius: '3px',
})

globalStyle('.markdown-content p', {
  margin: '0 0 20px',
})

globalStyle('.markdown-content a', {
  color: 'teal',
})
