import { style } from '@vanilla-extract/css'

import { defaultThemeVars } from '@/themes/default'

export const navbarStyles = style({
  backgroundColor: 'transparent',
  height: '100%',
  maxHeight: '90vh',
  marginBottom: '9px',
  maxWidth: '90vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  boxShadow: `0px 3px 6px 0px ${defaultThemeVars.colors.teal[9]}`,

  '@media': {
    [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
      minHeight: 'fit-content',
    },
  },
})

export const navbarMain = style({
  width: '100%',
  flex: 1,
  marginTop: defaultThemeVars.spacing.xs,
})

export const title = style({
  textTransform: 'uppercase',
  letterSpacing: '-0.25px',
})

export const link = style({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  fontSize: defaultThemeVars.fontSizes.sm,
  color: defaultThemeVars.colors.gray[7],
  border: `1px solid ${defaultThemeVars.colors.gray[7]}`,
  padding: `0 ${defaultThemeVars.spacing.sm}`,
  width: '100%',
  fontWeight: 500,
  marginBottom: 9,

  selectors: {
    '&:hover': {
      backgroundColor: defaultThemeVars.colors.gray[2],
    },
    '&[data-active]': {
      backgroundColor: defaultThemeVars.colors.teal[3],
    },
    '&[data-active]:hover': {
      backgroundColor: defaultThemeVars.colors.teal[3],
    },
    // '&:hover .linkIcon, &[data-active] .linkIcon, &[data-active]:hover .linkIcon': {
    //     color: defaultThemeVars.colors.red[1], // This combines the conditions for hover and active states
    // },
  },
})

export const linkIcon = style({
  color: defaultThemeVars.colors.white[3],
  marginRight: defaultThemeVars.spacing.sm,
  width: '25px',
  height: '25px',
})

export const footer = style({
  borderTop: `1px solid ${defaultThemeVars.colors.gray3}`, // Adjust for light-dark variation
  padding: `${defaultThemeVars.spacing.md} 0`,
  width: '100%',
})

// export const closeButton = style({
//     display: 'none',
//     width: '100%',

//     '@media': {
//         [`(max-width: ${defaultThemeVars.breakpoints.sm})`]: {
//             display: 'block',
//         },
//     },
// });

// export const openButton = style({
//     display: 'flex',
//     justifyContent: 'center',
//     marginTop: 15,
//     marginRight: 12,
//     width: '222px',
//     maxWidth: '90vw',
// });
