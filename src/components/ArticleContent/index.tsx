'use client'

import '@mantine/tiptap/styles.css'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Flex, Stack } from '@mantine/core'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import { ROUTE_PATHS } from '@/consts/route-paths'
import { useCreateArticle } from '@/mutations/useCreateArticle'
import { ArticleFormData } from '@/types/ArticleForm'

import ArticleContentField from './ArticleContentField'
import ArticleCoverField from './ArticleCoverField'
import ArticleIntroField from './ArticleIntroField'
import ArticleTitleField from './ArticleTitleField'
import { ArticleComponentCommonProps } from './common'

const schema = object({
  title: string().required('Please input article title'),
  introduction: string().optional(),
  content: object().required('Please input article content'),
  cover: object().required('Please select article thumbnail image'),
})

export type ArticleContentProps = ArticleComponentCommonProps & {
  defaultValues?: ArticleFormData
}

const ArticleContent: React.FC<ArticleContentProps> = ({ mode = 'view', defaultValues }) => {
  const router = useRouter()

  const methods = useForm<ArticleFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
    defaultValues,
  })

  const { mutate: createArticle, isPending: isSubmitting } = useCreateArticle()

  const onSubmit = useCallback(
    (data: ArticleFormData) => {
      createArticle(
        {
          title: data.title,
          cover: data.cover.id,
          introduction: data.introduction,
          content: data.content,
        },
        {
          onSuccess: (data) => {
            if (data.error || !data.data) return
            const {
              attributes: { slug },
            } = data.data
            if (!slug) return
            router.push(ROUTE_PATHS.BLOG.SINGULAR.replaceAll('{slug}', slug))
          },
        },
      )
    },
    [createArticle, router],
  )

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack>
          <ArticleCoverField mode={mode} />
          <ArticleTitleField mode={mode} />
          <ArticleIntroField mode={mode} />
          <ArticleContentField mode={mode} />
          {mode === 'form' ? (
            <Flex justify="flex-end" gap="sm">
              <Button type="submit" loading={isSubmitting}>
                Save
              </Button>
            </Flex>
          ) : null}
        </Stack>
      </form>
    </FormProvider>
  )
}

export default ArticleContent
