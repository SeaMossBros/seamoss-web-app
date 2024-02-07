import { style } from '@vanilla-extract/css'
import { defaultThemeVars } from '@/themes/default'

export const wrapper = style({
    display: 'flex',
    width: '100vw',
    margin: 0,
    padding: 0,
    flexDirection: 'column',
})

export const containerForm = style({
    display: 'flex',
    width: '100vw',
    // margin: '',
    padding: 'rem(21)',
    flexDirection: 'column',
    alignItems: 'center'
})