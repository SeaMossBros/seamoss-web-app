'use client'

import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { MoonStars, Sun } from 'tabler-icons-react'

const ColorSchemeToggler: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'

  return (
    <ActionIcon
      variant="outline"
      color={isDarkTheme ? 'yellow' : 'blue'}
      onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {isDarkTheme ? <Sun size={18} /> : <MoonStars size={18} />}
    </ActionIcon>
  )
}

export default ColorSchemeToggler
