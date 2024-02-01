import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const submitButtonContainer = style({
    '@media': {
        [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
            flexDirection: 'column-reverse'
        },
    },
})
