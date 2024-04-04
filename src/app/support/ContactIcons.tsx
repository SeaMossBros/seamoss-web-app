import { Box, Stack, Text } from '@mantine/core'
import { IconAt, IconSun } from '@tabler/icons-react'

import { descriptionStyle, linkStyle, wrapper } from './contact-icons.css'

interface ContactIconProps extends Omit<React.ComponentPropsWithoutRef<'div'>, 'title'> {
  icon: typeof IconSun
  title: string
  description: string
  inputMode: 'search' | 'text' | 'email' | 'tel' | 'none' | 'url' | 'numeric' | 'decimal'
}

function ContactIcon({ icon: Icon, title, description, inputMode, ...others }: ContactIconProps) {
  // Helper to render the correct link based on inputMode or title
  const renderDescription = () => {
    switch (inputMode) {
      case 'email':
        return (
          <a href={`mailto:${description}`} className={linkStyle}>
            {description}
          </a>
        )
      case 'tel':
        return (
          <a href={`tel:${description.replace(/\s/g, '')}`} className={linkStyle}>
            {description}
          </a>
        )
      case 'text':
        // Assuming 'Address' uses 'text' inputMode. Customize as needed.
        if (title.toLowerCase() === 'address') {
          const query = encodeURIComponent(description)
          return (
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${query}`}
              target="_blank"
              rel="noopener noreferrer"
              className={linkStyle}
            >
              {description}
            </a>
          )
        }
        return <span className={descriptionStyle}>{description}</span>
      default:
        return <span className={descriptionStyle}>{description}</span>
    }
  }

  return (
    <div className={wrapper} {...others}>
      <Box mr="md">
        <Icon style={{ width: 24, height: 24 }} />
      </Box>
      <div>
        <Text size="xs">{title}</Text>
        {renderDescription()}
      </div>
    </div>
  )
}

const MOCKDATA: Array<Omit<ContactIconProps, 'icon'> & { icon: typeof IconSun }> = [
  { title: 'Email', description: 'support@seathemoss.com', icon: IconAt, inputMode: 'email' },
  // { title: 'Phone', description: '+1 (000) 000-0000', icon: IconPhone, inputMode: 'tel' },
  // {
  //   title: 'Address',
  //   description: '# Street, City, State, Country',
  //   icon: IconMapPin,
  //   inputMode: 'text',
  // },
  // { title: 'Working hours', description: '9 a.m. – 5 p.m. EST', icon: IconSun, inputMode: 'text' },
]

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => <ContactIcon key={index} {...item} />)
  return <Stack>{items}</Stack>
}
