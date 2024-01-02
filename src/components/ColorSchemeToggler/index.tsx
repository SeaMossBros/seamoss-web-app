'use client'

import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { MoonStars, Sun } from 'tabler-icons-react'
import ToolTip from '../ToolTip'

const ColorSchemeToggler: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <ToolTip title={`Toggle color theme\n---\n<u>Press to activate ${isDarkTheme ? 'light' : 'dark'} mode</u>`} width='170px'>
      <ActionIcon
        variant="subtle" // subtle or light or outline
        onClick={() => toggleColorScheme()}
      >
        {isDarkTheme ? <Sun size={18} color='orange' /> : <MoonStars size={18} color='teal' />}
      </ActionIcon>
    </ToolTip>
  )
}

export default ColorSchemeToggler
