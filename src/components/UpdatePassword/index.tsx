'use client'

import { Button, Group, PasswordInput, Title, useMantineTheme } from '@mantine/core'
import { useForm } from '@mantine/form'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { updatePasswordCont, updatePasswordInput } from './update-password.css'

interface UpdatePasswordProps {
  password?: string
}

const UpdatePassword = ({ password }: UpdatePasswordProps) => {
  const { defaultRadius } = useMantineTheme()
  const [submittedForm, setSubmittedForm] = useState(false)
  const code = useSearchParams().get('code')

  console.log('code', code)

  const form = useForm({
    initialValues: {
      password: !password ? '' : password,
      newPassword: '',
      confirmNewPassword: '',
    },

    validate: {
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmittedForm(true)
    const { password, newPassword, confirmNewPassword } = form.values
    try {
      await axios('/api/auth/update-password', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          password,
          newPassword,
          confirmNewPassword,
        }),
      })
      // router.prefetch('/profile');
      // router.push('/profile');
    } catch (err) {
      setSubmittedForm(false)
      console.log(err)
    }
    setSubmittedForm(false)
  }

  return (
    <Group className={updatePasswordCont} style={{ borderRadius: defaultRadius }}>
      <Title fz={27} mb={21} style={{ alignSelf: 'center' }}>
        Update Your Password
      </Title>
      <PasswordInput
        label="Current Password"
        placeholder="Enter your current password"
        value={form.values.password}
        className={updatePasswordInput}
        onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
        required
        disabled={submittedForm}
      />
      <PasswordInput
        label="New Password"
        placeholder="Enter your new password"
        value={form.values.newPassword}
        className={updatePasswordInput}
        onChange={(event) => form.setFieldValue('newPassword', event.currentTarget.value)}
        required
        disabled={submittedForm}
      />
      <PasswordInput
        label="Confirm Password"
        placeholder="Confirm your new password"
        value={form.values.confirmNewPassword}
        className={updatePasswordInput}
        onChange={(event) => form.setFieldValue('confirmNewPassword', event.currentTarget.value)}
        required
        disabled={submittedForm}
      />
      <Button w="100%" miw={100} mt={12} onClick={handleSubmit}>
        Update
      </Button>
    </Group>
  )
}

export default UpdatePassword
