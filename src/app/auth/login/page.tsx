'use client'

import { Button, Card, Center, Group, Stack, Text } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { useMutation } from '@tanstack/react-query'
import { useCallback } from 'react'
import GoogleButton from 'react-google-button'

import { useService } from '@/hooks/useService'
import AuthService from '@/services/auth.service'

const LoginPage: React.FC = () => {
  const authService = useService(AuthService)

  const { mutate: getLoginUrl, isPending } = useMutation({
    mutationFn: () => authService.getLoginUrl(),
  })

  const onLoginClick = useCallback(() => {
    getLoginUrl(undefined, {
      onSettled: (res, error) => {
        if (!res?.url || error) {
          console.error(error, res)
          notifications.show({
            color: 'red',
            message: 'Unexpected error occurred',
          })
          return
        }
        window.location.assign(res.url)
      },
    })
  }, [getLoginUrl])

  return (
    <Stack justify="center" mt={64}>
      <Center>
        <Card withBorder>
          <Card.Section py="sm" inheritPadding>
            <Group>
              <Text fw={500}>Login</Text>
            </Group>
          </Card.Section>
          <Button component={GoogleButton} px={0} loading={isPending} onClick={onLoginClick} />
        </Card>
      </Center>
    </Stack>
  )
}

export default LoginPage
