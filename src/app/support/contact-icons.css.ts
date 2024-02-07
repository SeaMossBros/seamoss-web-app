import { style } from '@vanilla-extract/css'

export const wrapper = style({
    display: 'flex',
    alignItems: 'center',
    color: 'var(--mantine-color-white)',
})

export const icon = style({
    marginRight: 'var(--mantine-spacing-md)',
    backgroundColor: 'transparent',
})

export const titleStyle = style({
    marginBottom: '21px'
})

export const descriptionStyle = style({
    display: 'flex',
    alignItems: 'center',
    color: 'var(--mantine-color-white)',
})
