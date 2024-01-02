import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const productsWrapper = style({
    padding: '3vh 5vw',
    '@media': {
        [`(max-width: ${defaultThemeVars.breakpoints.md})`]: {
            padding: '2vh 9vw',
        },
    },
})