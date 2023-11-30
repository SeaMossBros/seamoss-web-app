'use client'

import { JSONContent } from '@tiptap/react'
import { useCallback } from 'react'
import { useFormContext } from 'react-hook-form'

import { ArticleFormData } from '@/types/ArticleForm'

import ContentEditor from '../ContentEditor'
import { ArticleComponentCommonProps } from './common'
import { articleInputField, contentEditorContent, contentEditorToolbar } from './styles.css'

export type ArticleContentFieldProps = ArticleComponentCommonProps

const ArticleContentField: React.FC<ArticleContentFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

  const onChange = useCallback(
    (json: JSONContent) => {
      methods.setValue('content', json)
    },
    [methods],
  )

  return (
    <ContentEditor
      readonly={mode === 'view'}
      classNames={{
        root: articleInputField,
        toolbar: contentEditorToolbar,
        content: contentEditorContent,
      }}
      defaultValue={methods.getValues('content')}
      placeholder="Article content goes here..."
      onChange={onChange}
    />
  )
}

export default ArticleContentField
