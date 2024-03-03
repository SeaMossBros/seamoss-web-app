import { style } from '@vanilla-extract/css'

export const toolTipStyle = style({
  position: 'absolute',
  padding: '6px',
  textAlign: 'center',
  whiteSpace: 'pre-line',
  zIndex: 1000,
  transition: 'opacity 0.3s ease-in-out',
})
