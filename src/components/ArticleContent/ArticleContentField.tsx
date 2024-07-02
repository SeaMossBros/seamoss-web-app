'use client'

import { Flex, useMantineTheme } from '@mantine/core'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import sanitizeHtml from 'sanitize-html'

import { ArticleFormData } from '@/types/ArticleForm'

import ContentEditor from '../ContentEditor'
import Markdown from '../Markdown'
import { ArticleComponentCommonProps } from './common'
import { articleInputField, contentEditorContent, contentEditorToolbar } from './styles.css'

export type ArticleContentFieldProps = ArticleComponentCommonProps

const ArticleContentField: React.FC<ArticleContentFieldProps> = ({ mode }) => {
  const { defaultRadius } = useMantineTheme()
  const methods = useFormContext<ArticleFormData>()

  const onChange = useCallback(
    (html: string) => {
      methods.setValue('content', html, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
    },
    [methods],
  )

  const replaceVideoLinksWithHtml = (inputText: string) => {
    const videoLinkRegex = /\[([^\]]+\.mp4)\]\((http[^\)]+\.mp4)\)/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = videoLinkRegex.exec(inputText)) !== null) {
      const [fullMatch, , videoUrl] = match
      const offset = match.index

      // Push sanitized HTML segment before the video link
      if (offset > lastIndex) {
        const htmlSegment = inputText.substring(lastIndex, offset)
        const sanitizedHtml = sanitizeHtml(htmlSegment)
        parts.push(<Markdown key={lastIndex}>{sanitizedHtml}</Markdown>)
      }

      // Push video element
      parts.push(
        <video
          width="70%"
          height="auto"
          controls
          key={offset}
          style={{ marginBottom: '33px', borderRadius: defaultRadius }}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>,
      )

      lastIndex = offset + fullMatch.length
    }

    // Push remaining sanitized HTML segment after the last video link
    if (lastIndex < inputText.length) {
      const htmlSegment = inputText.substring(lastIndex)
      const sanitizedHtml = sanitizeHtml(htmlSegment)
      parts.push(<Markdown key={lastIndex}>{sanitizedHtml}</Markdown>)
    }

    return parts
  }

  if (mode === 'view') {
    const html = methods.getValues('content')
    if (!html) return null

    return (
      <Flex direction={'column'} align={'center'}>
        {replaceVideoLinksWithHtml(html)}
      </Flex>
    )
  }

  return (
    <ContentEditor
      classNames={{
        root: articleInputField,
        toolbar: contentEditorToolbar,
        content: contentEditorContent,
      }}
      defaultValue={methods.getValues('content')}
      placeholder="Article content goes here..."
      onChange={onChange}
      error={methods.formState.errors.content?.message as unknown as string}
    />
  )
}

export default ArticleContentField
