'use client'

import { Anchor, Button, Group, Input, Text, Title, useMantineTheme } from '@mantine/core'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { forgotPassword } from './forgot-password.css'

interface ResetPasswordProps {
  email: string
}

const ForgotPassword = ({ email }: ResetPasswordProps) => {
  const router = useRouter()
  const isValid = (email: string) => {
    if (!email || !email.includes('@') || !email.includes('.')) return false
    return true
  }

  const [emailSentSuccessfully, setEmailSentSuccessfully] = useState(false)
  const [submittedForm, setSubmittedForm] = useState(false)
  const [userEmail, setUserEmail] = useState(email)
  const [isValidEmail, setIsValidEmail] = useState(isValid(email))
  const { defaultRadius } = useMantineTheme()

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setSubmittedForm(true)
    try {
      await axios('/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({ email: userEmail }),
      })
      setEmailSentSuccessfully(true)
    } catch (err) {
      setSubmittedForm(false)
      console.error(err)
    }
    setSubmittedForm(false)
  }

  return (
    <Group
      style={{ borderRadius: defaultRadius }}
      className={forgotPassword}
      mx={12}
      mt={'6vh'}
      px={0}
    >
      <Anchor
        c={'blue'}
        onClick={() => router.push('/login')}
        style={{ alignSelf: 'flex-start', cursor: 'pointer' }}
        ml={21}
        fz={15}
      >
        {'<-'} back to login
      </Anchor>
      <Title fz={27} mb={6}>
        Forgot Password
      </Title>
      <Text style={{ textAlign: 'center' }}>
        {emailSentSuccessfully
          ? 'Email sent! Please check your email and click the link to reset your password.'
          : 'Enter the email associated with your account to recieve a link and reset your password'}
      </Text>
      {!emailSentSuccessfully && (
        <>
          <Input
            value={userEmail}
            w={'75%'}
            maw={240}
            placeholder="Enter your email"
            onChange={(e) => {
              setUserEmail(e.target.value)
              setIsValidEmail(isValid(e.target.value))
            }}
          />
          <Button
            w="100%"
            miw={100}
            maw={201}
            mt={12}
            disabled={submittedForm || !isValidEmail}
            title={isValidEmail ? 'Send Reset Password Link' : 'Enter a valid email'}
            onClick={handleSubmit}
          >
            Send Link to Your Email
          </Button>
        </>
      )}
    </Group>
  )
}

export default ForgotPassword
