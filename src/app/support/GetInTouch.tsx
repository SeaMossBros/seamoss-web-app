'use client';

import { Text, TextInput, Textarea, Button, Group, SimpleGrid, useMantineTheme, useMantineColorScheme } from '@mantine/core';
import { contacts, fields, form, control, fieldsLabels, title, wrapper } from './get-in-touch.css'
import { ContactIconsList } from './ContactIcons';

const GetInTouch = () => {
  const { colors, defaultRadius } = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <div className={wrapper} style={{ borderRadius: defaultRadius }}>
      <div className={contacts} style={{ borderRadius: defaultRadius, background: isDarkTheme ? colors.red[6] : colors.teal[9] }}>
        <Text fz="lg" fw={700} className={title} c="#fff">
          Contact information
        </Text>
        <ContactIconsList />
      </div>

      <form className={form} onSubmit={(event) => event.preventDefault()}>
        <Text fz="lg" fw={700} className={title}>
          Get in touch
        </Text>

        <div className={fields}>
          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <TextInput label="Your name" placeholder="Your name" className={fieldsLabels} style={{ color: isDarkTheme ? '#f5f5f5' : colors.black[9]}}/>
            <TextInput label="Your email" placeholder="support@seathemoss.com" required className={fieldsLabels} style={{ color: isDarkTheme ? '#f5f5f5' : colors.black[9]}}/>
          </SimpleGrid>

          <TextInput mt="md" label="Subject" placeholder="Subject" required className={fieldsLabels} style={{ color: isDarkTheme ? '#f5f5f5' : colors.black[9]}}/>

          <Textarea
            mt="md"
            label="Your message"
            placeholder="Please include all relevant information"
            minRows={3}
            className={fieldsLabels}
            style={{ color: isDarkTheme ? '#f5f5f5' : colors.black[9]}}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit" className={control} style={{ color: isDarkTheme ? '#f5f5f5' : colors.black[9]}}>
              Send message
            </Button>
          </Group>
        </div>
      </form>
    </div>
  );
}

export default GetInTouch;