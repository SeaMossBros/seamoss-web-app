import { Group, Text, UnstyledButton } from '@mantine/core'

import { AuthUser } from '@/types/Auth'

import { userStyles } from './user-button.css'

interface UserButtonProps {
  user: AuthUser
}

const UserButton = ({ user }: UserButtonProps) => {
  if (!user.email)
    return (
      <UnstyledButton className={userStyles}>
        <Group>
          <img
            src={'/images/icons8-account.gif'}
            width={60}
            alt="user profile pic"
            style={{ borderRadius: '15px' }}
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
          style={{ borderRadius: '15px' }}
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
