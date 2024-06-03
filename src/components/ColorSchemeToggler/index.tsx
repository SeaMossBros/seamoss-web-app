'use client'

import { ActionIcon, Group, useMantineColorScheme, useMantineTheme } from '@mantine/core'
import { MoonStars, Sun } from 'tabler-icons-react'

import { useSchemeManager } from '@/hooks/useSchemeManager'

// import ToolTip from '../ToolTip'

const ColorSchemeToggler: React.FC = () => {
  const { defaultRadius } = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const schemeManager = useSchemeManager()
  const isDarkTheme = colorScheme === 'dark'

  const toggleColorSchemeColor = () => {
    toggleColorScheme()
    schemeManager.set(isDarkTheme ? 'light' : 'dark')
  }

  return (
    // <ToolTip title={`Toggle color theme\n---\n<u>Press to activate ${isDarkTheme ? 'light' : 'dark'} mode</u>`} width='170px'>
    <Group
      onClick={() => {
        toggleColorSchemeColor()
      }}
      style={{
        borderRadius: defaultRadius,
        border: '1px solid gray',
        transition: '0.3s ease-in-out',
        cursor: 'pointer',
        minWidth: 72,
      }}
      p={3}
    >
      <ActionIcon
        variant="transparent"
        style={{
          borderRadius: Number(defaultRadius) - 1,
          border: `${isDarkTheme ? 'none' : '1px solid orange'}`,
        }}
      >
        {isDarkTheme ? <Sun size={18} color="gray" /> : <Sun size={18} color="orange" />}
      </ActionIcon>
      <ActionIcon
        variant="transparent"
        style={{
          borderRadius: Number(defaultRadius) - 1,
          border: `${isDarkTheme ? '1px solid #116aaa' : 'none'}`,
        }}
      >
        {isDarkTheme ? (
          <MoonStars size={18} color="#116aaa" />
        ) : (
          <MoonStars size={18} color="gray" />
        )}
      </ActionIcon>
    </Group>
    // </ToolTip>
  )
}

export default ColorSchemeToggler
