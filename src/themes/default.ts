import { generateColors } from '@mantine/colors-generator';
import { createTheme, DefaultMantineColor, MantineColorsTuple,rem  } from "@mantine/core";
import { themeToVars } from '@mantine/vanilla-extract';

import { interFont } from "@/fonts/inter";

export const defaultTheme = createTheme({
  fontFamily: interFont.style.fontFamily,
  radius: {
    lg: rem(0),
    md: rem(0),
    sm: rem(0),
    xl: rem(0),
    xs: rem(0)
  },
  colors: {
    'primary-green': generateColors('#026055'),
    'primary-gray': generateColors('#778490'),
    'secondary-blue': generateColors('#20BFDB'),
    'secondary-pink': generateColors('#E5BDAC'),
    'secondary-gray': generateColors('#A2ADA6')
  },
  primaryColor: 'primary-green',
  primaryShade: 9
})

export const defaultThemeVars = themeToVars(defaultTheme);

type ExtendedCustomColors = 
  | 'primary-green'
  | 'primary-gray'
  | 'secondary-blue'
  | 'secondary-pink'
  | 'secondary-gray'
  | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}