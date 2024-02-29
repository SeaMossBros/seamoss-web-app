import { style } from '@vanilla-extract/css';
import { defaultThemeVars } from '@/themes/default';

export const orderWrapper = style({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: defaultThemeVars.spacing.xl,
    width: '100vw',
    height: '100vh',
    minHeight: 'fit-content',
})

export const orderStyle = style({
    marginBottom: '30px',
    width: '60vw',
    minHeight: '48px',
    cursor: 'pointer',

    selectors: {
        '&:hover': {
            backgroundColor: defaultThemeVars.colors.gray[0],
            borderColor: defaultThemeVars.colors.teal[9],
        },
    }
})