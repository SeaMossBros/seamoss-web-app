import { UnstyledButton, Group, Text  } from '@mantine/core';
import { userStyles } from './user-button.css';
import { UserType } from '@/types/User';

interface UserButtonProps {
    user: UserType
}

const UserButton = ({ user }: UserButtonProps) => {
    if (!user.email) return (
        <UnstyledButton className={userStyles}>
            <Group>
                <img
                    src={'/images/icons8-account.gif'}
                    width={60}
                    alt='user profile pic'
                    style={{borderRadius: '15px'}} 
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
    );

    return (
        <UnstyledButton className={userStyles}>
            <Group>
                <img
                    src={user.picture}
                    onError={(e) => e.currentTarget.src = '/images/icons8-account.gif'}
                    width={60}
                    // height={200}
                    alt='user profile pic'
                    style={{borderRadius: '15px'}} 
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
    );
}

export default UserButton;