import { DefaultMantineColor, MantineColorsTuple } from '@mantine/core'

type ExtendedCustomColors =
  | 'teal'
  | 'gray'
  | 'secondary-blue'
  | 'secondary-pink'
  | 'secondary-gray'
  | DefaultMantineColor

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>
  }
}
