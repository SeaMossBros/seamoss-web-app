import { defaultThemeVars } from '@/themes/default'
import { style } from '@vanilla-extract/css'

export const title = style({
    display: 'flex',
    fontSize: '6rem',
    fontWeight: 'bold',

    '@media': {
        [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
        },
    },
})