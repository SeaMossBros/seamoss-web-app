import { Group, Text, UnstyledButton, useMantineColorScheme, useMantineTheme } from '@mantine/core'

import { AuthUser } from '@/types/Auth'

import { userStyles } from './user-button.css'

interface UserButtonProps {
  user: AuthUser
}

const UserButton = ({ user }: UserButtonProps) => {
  const { colors } = useMantineTheme()
  const { colorScheme } = useMantineColorScheme()
  const isDarkTheme = colorScheme === 'dark'

  if (!user.email)
    return (
      <UnstyledButton className={userStyles}>
        <Group>
          <img
            src={'/images/icons8-account.gif'}
            width={60}
            alt="user profile pic"
            style={{
              borderRadius: '15px',
              backgroundColor: isDarkTheme ? colors.gray[1] : 'transparent',
            }}
          />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500}>
              your username
            </Text>

            <Text c="dimmed" size="xs">
              your@email.com
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    )

  return (
    <UnstyledButton className={userStyles}>
      <Group>
        <img
          src={'/images/icons8-account.gif'}
          onError={(e) => (e.currentTarget.src = '/images/icons8-account.gif')}
          width={60}
          alt="user profile pic"
          style={{
            borderRadius: '15px',
            backgroundColor: isDarkTheme ? colors.gray[1] : 'transparent',
          }}
        />

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {user.username || user.email.split('@')[0]}
          </Text>

          <Text c="dimmed" size="xs">
            {user.email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  )
}

export default UserButton
