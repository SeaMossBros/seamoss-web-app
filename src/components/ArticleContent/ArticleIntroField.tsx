'use client'

import { Textarea } from '@mantine/core'
import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'
import sanitizeHtml from 'sanitize-html'

import { ArticleFormData } from '@/types/ArticleForm'

import Markdown from '../Markdown'
import { ArticleComponentCommonProps } from './common'
import { articleInputField, articleIntro } from './styles.css'

export type ArticleIntroFieldProps = ArticleComponentCommonProps

const ArticleIntroField: React.FC<ArticleIntroFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

  if (mode === 'view') {
    const html = methods.getValues('introduction') || ''
    if (!html) return null
    const sanitizedHtml = sanitizeHtml(html)
    return <Markdown className={articleIntro}>{sanitizedHtml}</Markdown>
  }

  return (
    <Textarea
      {...methods.register('introduction')}
      errorProps={{
        fw: 400,
        fz: 'sm',
      }}
      classNames={{
        input: classNames(articleInputField, articleIntro),
      }}
      size="md"
      placeholder="A short introduction about the article..."
      autosize
      mt={12}
      mb={12}
    />
  )
}

export default ArticleIntroField
