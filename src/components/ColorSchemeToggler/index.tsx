'use client'

import { ActionIcon, useMantineColorScheme } from '@mantine/core'
import { MoonStars, Sun } from 'tabler-icons-react'
import ToolTip from '../ToolTip'
import { useSchemeManager } from '@/hooks/useSchemeManager'

const ColorSchemeToggler: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const schemeManager = useSchemeManager();
  const isDarkTheme = colorScheme === 'dark';

  const toggleColorSchemeColor = () => {
    toggleColorScheme();
    schemeManager.set(isDarkTheme ? 'light' : 'dark')
  }
  
  return (
    // <ToolTip title={`Toggle color theme\n---\n<u>Press to activate ${isDarkTheme ? 'light' : 'dark'} mode</u>`} width='170px'>
      <ActionIcon
        variant="subtle" // subtle or light or outline
        onClick={() => toggleColorSchemeColor()}
      >
        {isDarkTheme ? <Sun size={18} color='orange' /> : <MoonStars size={18} color='#116aaa' />}
      </ActionIcon>
    // </ToolTip>
  )
}

export default ColorSchemeToggler
