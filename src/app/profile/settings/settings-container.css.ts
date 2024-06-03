import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const settingItem = style({
  borderBottom: `0.72px solid ${defaultThemeVars.colors.gray[9]}`,
})

/*
selectors: {
        '&:hover': {
            borderColor: defaultThemeVars.colors.teal[9],
        },
    },
    '@media': {
        [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
            width: '81vw',
        },
    },
*/
