import { defaultThemeVars } from '@/themes/default'
import { style } from '@vanilla-extract/css'

export const wrapper = style({
    width: '100vw',
    position: 'relative',
    paddingTop: 'rem(180px)',
    paddingBottom: 'rem(130px)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundImage: "url('/images/SeaTheMoss-Empty-Icon.png')",

    '@media': {
        [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
            paddingTop: 'rem(80px)',
            paddingBottom: 'rem(50px)',
        },
    },
})

export const inner = style({
    position: 'relative',
    zIndex: '1',
})

export const title = style({
    fontWeight: '800',
    fontSize: 'rem(40px)',
    letterSpacing: 'rem(-1px)',
    paddingLeft: 'var(--mantine-spacing-md)',
    paddingRight: 'var(--mantine-spacing-md)',
    color: 'var(--mantine-color-white)',
    marginBottom: 'var(--mantine-spacing-xs)',
    textAlign: 'center',
    fontFamily: 'Palantino',

    '@media': {
        [`(max-width: ${defaultThemeVars.breakpoints.xs})`]: {
            fontSize: 'rem(18px)',
            textAlign: 'left',
        },
    },
})
