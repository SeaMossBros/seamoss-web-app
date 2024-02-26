import { style } from '@vanilla-extract/css'

export const wrapper = style({
    display: 'flex',
    alignItems: 'center',
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
})

export const linkStyle = style({
    display: 'flex',
    alignItems: 'center',
    color: 'var(--mantine-color-blue-5)',

    ':hover': {
        color: 'var(--mantine-color-blue-9)',
    }
})
