'use client'

import { Button, Group, Input, Text, Title, useMantineTheme } from '@mantine/core'

import { updatePasswordCont } from '../profile-page.css'

interface ResetPasswordProps {
  email: string
}

const ResetPassword = ({ email }: ResetPasswordProps) => {
  const { defaultRadius } = useMantineTheme()

  return (
    <Group className={updatePasswordCont} style={{ borderRadius: defaultRadius }}>
      <Title fz={27} mb={6} style={{ alignSelf: 'center' }}>
        Forgot Password
      </Title>
      <Text style={{ textAlign: 'center' }}>
        Click to recieve a link to your email in order to reset your password
      </Text>
      <Input defaultValue={email} readOnly style={{ alignSelf: 'center' }} />
      <Button w="100%" miw={100} mt={12}>
        Send Link to Your Email
      </Button>
    </Group>
  )
}

export default ResetPassword
