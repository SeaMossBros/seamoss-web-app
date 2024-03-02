import { style } from '@vanilla-extract/css';
import { defaultThemeVars } from '@/themes/default';

export const userStyles = style({
    display: 'block',
    width: '100%', // Adjust according to your project's rem function utility
    padding: defaultThemeVars.spacing.md,
    color: `light-dark(var(${defaultThemeVars.colors.black[0]}), var(${defaultThemeVars.colors.black[0]}))`,
    marginBottom: '12px',

    selectors: {
        '&:hover': {
            backgroundColor: defaultThemeVars.colors.gray[0], // Adjust for light-dark variation according to your theme management system
        },
    }, 
});
