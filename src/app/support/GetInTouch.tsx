'use client'

import {
  Button,
  Group,
  List,
  ListItem,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  useMantineTheme,
} from '@mantine/core'
import { useState } from 'react'

import APIService from '@/services/api.service'

import { ContactIconsList } from './ContactIcons'
import { contacts, control, fields, form, title, wrapper } from './get-in-touch.css'

const _INITIAL_MESSAGE = {
  body: {
    value: '',
    isValid: false,
    isAfterChange: false,
  },
  subject: {
    value: '',
    isValid: false,
    isAfterChange: false,
  },
  name: {
    value: '',
    isValid: false,
    isAfterChange: false,
  },
  email: {
    value: '',
    isValid: false,
    isAfterChange: false,
  },
}

const GetInTouch = () => {
  const { defaultRadius } = useMantineTheme()
  const apiService = new APIService()
  const [disabled, setDisabled] = useState(true)
  const [errors, setErrors] = useState([])
  const [status, setStatus] = useState<'' | 'SUCCESS' | 'ERROR'>('')
  const [data, setData] = useState({ ..._INITIAL_MESSAGE })

  const validateEmail = (email: string) => {
    if (!email || !email.includes('@') || !email.includes('.')) return false
    return true // not sure what this does.... !!(() => /^\S+@\S+$/.test(email))
  }

  const onChange = (field: 'body' | 'subject' | 'name' | 'email', value: string) => {
    if (
      (field === 'body' && !value.length) ||
      (field === 'subject' && !value.length) ||
      (field === 'name' && !value.length) ||
      (field === 'email' && !validateEmail(value))
    ) {
      setData((prev) => ({
        ...prev,
        [field]: {
          value,
          isValid: false,
          isAfterChange: true,
        },
      }))
      setDisabled(true)
      return
    }

    if (
      (field === 'body' && value.length) ||
      (field === 'subject' && value.length) ||
      (field === 'name' && value.length) ||
      (field === 'email' && validateEmail(value))
    ) {
      setData((prev) => {
        const updatedData = {
          ...prev,
          [field]: {
            value,
            isValid: true,
            isAfterChange: true,
          },
        }

        if (
          updatedData.body.isValid &&
          updatedData.subject.isValid &&
          updatedData.name.isValid &&
          updatedData.email.isValid
        ) {
          setStatus('')
          setDisabled(false)
        }

        return updatedData
      })
    }
  }

  const onSubmit = async (e: any) => {
    e.preventDefault()
    setDisabled(true)
    try {
      const res = await apiService.submitSupportMessage({
        body: data.body.value,
        name: data.name.value,
        subject: data.subject.value,
        email: data.email.value,
      })

      if (res.data && res.data.id > 0) {
        setStatus('SUCCESS')
        setTimeout(() => {
          setData({ ..._INITIAL_MESSAGE })
          setStatus('')
          setDisabled(false)
        }, 6666)
        return
      }
      setErrors(res.error?.details?.errors || [])
      setStatus('ERROR')
    } catch (err) {
      console.log(err)
      setStatus('ERROR')
    }
  }

  return (
    <div className={wrapper}>
      <div className={contacts}>
        <Text fz="lg" fw={700} className={title}>
          Contact information
        </Text>
        <ContactIconsList />
      </div>

      <form className={form} onSubmit={onSubmit}>
        <Text fz="lg" fw={700} className={title}>
          Get in touch
        </Text>

        <div className={fields}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput
              label="Your name"
              placeholder="Your name"
              onChange={(e: any) => onChange('name', e.target.value)}
              value={data.name.value}
              p={3}
              required
              style={{ borderColor: data.name.isAfterChange && data.name.isValid ? '' : 'red' }}
            />
            <TextInput
              label="Your email"
              placeholder="support@seathemoss.com"
              onChange={(e: any) => onChange('email', e.target.value)}
              value={data.email.value}
              p={3}
              required
              style={{ borderColor: data.email.isAfterChange && data.email.isValid ? '' : 'red' }}
            />
          </SimpleGrid>

          <TextInput
            mt="md"
            label="Subject"
            placeholder="Subject"
            onChange={(e: any) => onChange('subject', e.target.value)}
            value={data.subject.value}
            p={3}
            required
            style={{ borderColor: data.subject.isAfterChange && data.subject.isValid ? '' : 'red' }}
          />

          <Textarea
            mt="md"
            label="Your message"
            placeholder="Please include all relevant information"
            minRows={3}
            onChange={(e: any) => onChange('body', e.target.value)}
            value={data.body.value}
            p={3}
            autosize={true}
            minLength={3}
            maxLength={777}
            required
            style={{ borderColor: data.body.isAfterChange && data.body.isValid ? '' : 'red' }}
          />

          {status.length > 0 && (
            <Text
              fz="md"
              p={6}
              mt="sm"
              fw={700}
              className={title}
              c={'white'}
              bg={status === 'ERROR' ? 'red' : 'green'}
              style={{ borderRadius: defaultRadius }}
            >
              {status === 'ERROR'
                ? 'FAILED to send: Please try again. Make sure to enter correct values for every field.'
                : 'SUCCESS! Sent message to support. We will try to get back in 2-3 business days. Thank you for being a customer!'}
              {status === 'ERROR' && errors.length > 0 && (
                <List ml={21}>
                  {errors.map((error: any, i) => (
                    <ListItem key={i}>{error.message}</ListItem>
                  ))}
                </List>
              )}
            </Text>
          )}

          <Group justify="flex-end" mt="md">
            <Button
              type="submit"
              className={control}
              disabled={disabled}
              title={disabled ? 'Please Fill Out Required Fields' : 'Send message to support'}
            >
              Send message
            </Button>
          </Group>
        </div>
      </form>
    </div>
  )
}

export default GetInTouch
