import { style } from '@vanilla-extract/css'

export const pagination = style({
  display: 'flex',
  justifyContent: 'flex-end',
})

export const chevron = style({
  selectors: {
    '&[data-rotate]': {
      transform: 'rotate(45deg)',
    },
  },
})
