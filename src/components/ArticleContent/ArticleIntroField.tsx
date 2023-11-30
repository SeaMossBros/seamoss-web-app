'use client'

import { Text, Textarea } from '@mantine/core'
import classNames from 'classnames'
import { useFormContext } from 'react-hook-form'

import { ArticleFormData } from '@/types/ArticleForm'

import { ArticleComponentCommonProps } from './common'
import { articleInputField, articleIntro } from './styles.css'

export type ArticleIntroFieldProps = ArticleComponentCommonProps

const ArticleIntroField: React.FC<ArticleIntroFieldProps> = ({ mode }) => {
  const methods = useFormContext<ArticleFormData>()

  if (mode === 'view')
    return <Text className={articleIntro}>{methods.getValues('introduction') || 'Intro'}</Text>

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
    />
  )
}

export default ArticleIntroField
