'use client'

import { Center, Stack } from '@mantine/core'
import AuthenticationForm from './AuthForm'
import { useRouter } from 'next/navigation';

const LoginClientSide: React.FC = () => {

  const onLoginSuccess = () => {

  }
  return (
    <Stack justify="center" mt={64}>
      <Center>
        <AuthenticationForm />
      </Center>
    </Stack>
  )
}

export default LoginClientSide
