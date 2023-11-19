import React from 'react'

import './TextLink.css'
import { Anchor } from '@mantine/core'

interface TextLinkProps {
    textToShow: string;
    url: string;
    size?: string;
    highlight?: boolean;
    underline?: boolean;
}

const TextLink = ({ textToShow, url, size, highlight, underline }: TextLinkProps) => {
    return (
        <Anchor
            c={highlight ? '#a9391e' : ''}
            underline={underline ? 'always' : 'never'}
            href={url}
            lh={1}
            size={size ? size : 'md'}
            className={'text-link'}
        >
            {textToShow}
        </Anchor>
    )
}

export default TextLink;
