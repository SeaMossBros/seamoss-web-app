import { style } from '@vanilla-extract/css';
import { defaultThemeVars } from '@/themes/default';

export const navbarStyles = style({
    backgroundColor: defaultThemeVars.colors.body,
    height: '840px', // Adjust according to your project's rem function utility
    width: '300px', // Adjust according to your project's rem function utility
    padding: defaultThemeVars.spacing.md,
    display: 'flex',
    flexDirection: 'column',
});

export const navbarMain = style({
    flex: 1,
    marginTop: defaultThemeVars.spacing.xl,
});

export const title = style({
    textTransform: 'uppercase',
    letterSpacing: '-0.25px', // Adjust according to your project's rem function utility
});

export const link = style({
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: defaultThemeVars.fontSizes.sm,
    color: defaultThemeVars.colors.gray[7], // Adjust for light-dark variation
    padding: `${defaultThemeVars.spacing.xs} ${defaultThemeVars.spacing.sm}`,
    width: '100%',
    fontWeight: 500,

    selectors: {
        '&:hover': {
            backgroundColor: defaultThemeVars.colors.gray[0], // Adjust for light-dark variation
            // color: defaultThemeVars.colors.black, // Adjust for light-dark variation
        },
        '&[data-active]': {
            backgroundColor: defaultThemeVars.colors.teal[1],
            // color: defaultThemeVars.colors.red[1],
        },
        '&[data-active]:hover': {
            backgroundColor: defaultThemeVars.colors.teal[6],
            // color: defaultThemeVars.colors.red[1],
        },
        // '&:hover .linkIcon, &[data-active] .linkIcon, &[data-active]:hover .linkIcon': {
        //     color: defaultThemeVars.colors.red[1], // This combines the conditions for hover and active states
        // },
    },
});

export const linkIcon = style({
    color: defaultThemeVars.colors.gray[6], // Adjust for light-dark variation
    marginRight: defaultThemeVars.spacing.sm,
    width: '25px', // Adjust according to your project's rem function utility
    height: '25px', // Adjust according to your project's rem function utility
});

export const footer = style({
    borderTop: `1px solid ${defaultThemeVars.colors.gray3}`, // Adjust for light-dark variation
    paddingTop: defaultThemeVars.spacing.md,
});
