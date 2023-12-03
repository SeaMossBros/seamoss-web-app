'use client'

import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'
import sanitizeHtml from 'sanitize-html'

import { ArticleFormData } from '@/types/ArticleForm'

import ContentEditor from '../ContentEditor'
import { ArticleComponentCommonProps } from './common'
import { articleInputField, contentEditorContent, contentEditorToolbar } from './styles.css'

export type ArticleContentFieldProps = ArticleComponentCommonProps

const ArticleContentField: React.FC<ArticleContentFieldProps> = ({ mode }) => {
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

  if (mode === 'view') {
    const html = methods.getValues('content')
    if (!html) return null
    const sanitizedHtml = sanitizeHtml(html)
    return (
      <div
        dangerouslySetInnerHTML={{
          __html: sanitizedHtml,
        }}
      />
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
