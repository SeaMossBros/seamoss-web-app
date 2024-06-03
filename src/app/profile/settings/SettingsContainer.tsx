'use client'

import { Flex, Group, Text, Title } from '@mantine/core'

import ColorSchemeToggler from '@/components/ColorSchemeToggler'
import { AuthUser } from '@/types/Auth'

import { title } from '../profile-page.css'
import { settingItem } from './settings-container.css'

interface SettingsProps {
  user: AuthUser
}

const SettingsContainer = ({ user }: SettingsProps) => {
  if (!user.id) return <div>Unable to show settings</div>

  return (
    <Group display={'flex'} style={{ flexDirection: 'column' }} w={'100%'}>
      <Title className={title}>Settings</Title>
      <Flex justify={'space-between'} align={'center'} w={'60%'} className={settingItem} p={12}>
        <Text mr={12}>Change Theme</Text>
        <ColorSchemeToggler />
      </Flex>
      {/* <Flex justify={'space-between'} align={'center'} w={'60%'} className={settingItem} p={12}>
                <Text mr={12}></Text>
            </Flex> */}
    </Group>
  )
}

export default SettingsContainer
