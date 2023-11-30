'use client'

import { useFormContext } from 'react-hook-form'

import { ArticleFormData } from '@/types/ArticleForm'

import ContentEditor from '../ContentEditor'
import { ArticleComponentCommonProps } from './common'
import { articleInputField, contentEditorContent, contentEditorToolbar } from './styles.css'

export type ArticleContentFieldProps = ArticleComponentCommonProps

const ArticleContentField: React.FC<ArticleContentFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

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
    />
  )
}

export default ArticleContentField
