import { Anchor } from '@mantine/core'
import React from 'react'

import { textLink } from './TextLink.css'

interface TextLinkProps {
  textToShow: string
  url: string
  size?: string
  highlight?: boolean
  underline?: boolean
}

const TextLink = ({ textToShow, url, size, highlight, underline }: TextLinkProps) => {
  return (
    <Anchor
      c={highlight ? '#a9391e' : ''}
      underline={underline ? 'always' : 'never'}
      href={url}
      lh={1}
      size={size ? size : 'md'}
      className={textLink}
    >
      {textToShow}
    </Anchor>
  )
}

export default TextLink
