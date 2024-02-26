'use client';

import { Text, TextInput, Textarea, Button, Group, SimpleGrid, useMantineTheme, List, ListItem } from '@mantine/core';
import { contacts, fields, form, control, title, wrapper } from './get-in-touch.css'
import { ContactIconsList } from './ContactIcons';
import { useState } from 'react';
import { SupportMessage_Plain } from '@/types/SupportMessage';
import APIService from '@/services/api.service';

const GetInTouch = () => {
  const { defaultRadius } = useMantineTheme();
  const apiService = new APIService();
  const [disabled, setDisabled] = useState(true);
  const [errors, setErrors] = useState([]);
  const [status, setStatus] = useState<'' | 'SUCCESS' | 'ERROR'>('');
  const [data, setData] = useState<SupportMessage_Plain>({
    body: '',
    subject: '',
    name: '',
    email: ''
  })

  const onChange = (field: string, value: string) => {
    setData((prev) => ({ ...prev, [field]: value}));
    if (data.body.length
      && data.subject.length
      && data.name.length
      && data.email.length
      && ((field === 'email' && value.includes('@'))
        || data.email.includes('@'))
    ) {
      setStatus('');
      setDisabled(false);
    }
  }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const res = await apiService.submitSupportMessage(data);
      // console.log('res on get in touch page', res);
      if (res.data && res.data.id > 0) {
        setStatus('SUCCESS');
        setTimeout(() => {
          setData({
            body: '',
            subject: '',
            name: '',
            email: ''
          });
          setStatus('');
          setDisabled(false);
        }, 6666);
        return;
      }
      setErrors(res.error?.details?.errors || []);
      setStatus('ERROR');
    } catch (err) {
      console.log(err);
      setStatus('ERROR');
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
              value={data.name} 
              p={3}
              required 
            />
            <TextInput 
              label="Your email" 
              placeholder="support@seathemoss.com" 
              onChange={(e: any) => onChange('email', e.target.value)} 
              value={data.email} 
              p={3}
              required
            />
          </SimpleGrid>

          <TextInput 
            mt="md" 
            label="Subject" 
            placeholder="Subject" 
            onChange={(e: any) => onChange('subject', e.target.value)} 
            value={data.subject} 
            p={3}
            required 
          />

          <Textarea
            mt="md"
            label="Your message"
            placeholder="Please include all relevant information"
            minRows={3}
            onChange={(e: any) => onChange('body', e.target.value)}
            value={data.body} 
            p={3}
            autosize={true}
            minLength={3}
            maxLength={777}
            required
          />

          {status.length > 0 && 
            <Text 
              fz="md" 
              p={6} 
              mt='sm'
              fw={700} 
              className={title} 
              c={'white'} 
              bg={status === 'ERROR' ? 'red' : 'green'}
              style={{ borderRadius: defaultRadius }}
            >
              {status === 'ERROR'
                ? 'FAILED to send: Please try again. Make sure to enter correct values for every field.'
                : 'SUCCESS! Sent message to support. We will try to get back in 2-3 business days. Thank you for being a customer!'
              }
              {status === 'ERROR' && (
                <List ml={21}>
                  {errors.map((error: any, i) => (
                    <ListItem key={i}>{error.message}</ListItem>
                  ))}
                </List>
              )}
            </Text>
          }

          <Group justify="flex-end" mt="md">
            <Button type="submit" className={control} disabled={disabled}>
              Send message
            </Button>
          </Group>
        </div>
      </form>
    </div>
  );
}

export default GetInTouch;