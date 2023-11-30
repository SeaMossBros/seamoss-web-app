'use client'

import { TextInput, Title } from '@mantine/core'
import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'

import { ArticleFormData } from '@/types/ArticleForm'

import { ArticleComponentCommonProps } from './common'
import { articleInputField, articleTitle } from './styles.css'

export type ArticleTitleFieldProps = ArticleComponentCommonProps

const ArticleTitleField: React.FC<ArticleTitleFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

  if (mode === 'view') return <Title order={1}>{methods.getValues('title') || 'Title'}</Title>

  return (
    <TextInput
      {...methods.register('title')}
      placeholder="Article title goes here..."
      error={methods.formState.errors.title?.message}
      size="xl"
      fz="xl"
      fw="bold"
      errorProps={{
        fz: 'sm',
        fw: 'normal',
      }}
      classNames={{
        input: classNames(articleInputField, articleTitle),
      }}
    />
  )
}

export default ArticleTitleField
