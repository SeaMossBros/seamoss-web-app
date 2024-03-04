'use client'

import { Center, Stack } from '@mantine/core'

import AuthenticationForm from './AuthForm'

const LoginClientSide: React.FC = () => {
  return (
    <Stack justify="center" mt={64}>
      <Center>
        <AuthenticationForm />
      </Center>
    </Stack>
  )
}

export default LoginClientSide
