'use client'

import '@mantine/tiptap/styles.css'

import { yupResolver } from '@hookform/resolvers/yup'
import { Stack } from '@mantine/core'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import { ArticleFormData } from '@/types/ArticleForm'

import ArticleContentField from './ArticleContentField'
import ArticleCoverField from './ArticleCoverField'
import ArticleIntroField from './ArticleIntroField'
import ArticleTitleField from './ArticleTitleField'
import { ArticleComponentCommonProps } from './common'

const schema = object({
  title: string().required('Please input article title'),
  summary: string(),
  content: object().required('Please input article content'),
  thumbnail: string().required('Please select article thumbnail image'),
})

export type ArticleContentProps = ArticleComponentCommonProps

const ArticleContent: React.FC<ArticleContentProps> = ({ mode = 'view' }) => {
  const methods = useForm<ArticleFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
  })
  return (
    <FormProvider {...methods}>
      <Stack>
        <ArticleCoverField mode={mode} />
        <ArticleTitleField mode={mode} />
        <ArticleIntroField mode={mode} />
        <ArticleContentField mode={mode} />
      </Stack>
    </FormProvider>
  )
}

export default ArticleContent
