'use client'

import '@mantine/tiptap/styles.css'

import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Flex, Group, Stack, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import { useCreateArticle } from '@/mutations/useCreateArticle'
import { useDeleteArticle } from '@/mutations/useDeleteArticle'
import { useUpdateArticle } from '@/mutations/useUpdateArticle'
import { Article, Article_NoRelations } from '@/types/Article'
import { ArticleFormData } from '@/types/ArticleForm'

import ArticleAuthorField from './ArticleAuthorField'
import ArticleContentField from './ArticleContentField'
import ArticleCoverField from './ArticleCoverField'
import ArticleIntroField from './ArticleIntroField'
import ArticleTitleField from './ArticleTitleField'
import { ArticleComponentCommonProps } from './common'

const schema = object({
  title: string().required('Please input article title'),
  introduction: string().optional(),
  content: string().required('Please input article content'),
  cover: object().required('Please select article thumbnail image'),
})

export type ArticleContentProps = ArticleComponentCommonProps & {
  id?: number
  isAuthenticated?: boolean
  defaultValues?: ArticleFormData
  onEdit?: () => void
  onSaved?: (data: Article) => void
  onDeleted?: () => void
  onCancel?: () => void
}

const ArticleContent: React.FC<ArticleContentProps> = ({
  id,
  isAuthenticated,
  mode = 'view',
  defaultValues,
  onEdit,
  onSaved,
  onDeleted,
  onCancel,
}) => {
  const methods = useForm<ArticleFormData>({
    mode: 'onChange',
    resolver: yupResolver(schema) as any,
    defaultValues,
  })

  const { mutate: createArticle, isPending: isCreating } = useCreateArticle()
  const { mutate: updateArticle, isPending: isUpdating } = useUpdateArticle()
  const { mutate: deleteArticle } = useDeleteArticle()

  const onDelete = useCallback(() => {
    if (!id) return
    modals.openConfirmModal({
      title: 'Confirm delete article',
      children: (
        <Text size="sm">Are you sure to delete this article? This action is not revertable.</Text>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: {
        color: 'red',
      },
      onConfirm: () =>
        deleteArticle(id, {
          onSuccess: () => onDeleted?.(),
        }),
    })
  }, [deleteArticle, id, onDeleted])

  const onSubmit = useCallback(
    (data: ArticleFormData) => {
      const payload: Partial<Article_NoRelations> = {
        title: data.title,
        cover: data.cover.id,
        introduction: data.introduction,
        content: data.content,
        author: data.author?.id,
      }

      if (id) {
        return updateArticle(
          {
            id,
            article: payload,
          },
          {
            onSuccess: (data) => {
              if (data.error || !data.data) return
              onSaved?.(data.data)
            },
          },
        )
      }

      createArticle(payload, {
        onSuccess: (data) => {
          if (data.error || !data.data) return
          onSaved?.(data.data)
        },
      })
    },
    [createArticle, id, onSaved, updateArticle],
  )

  return (
    <div style={{ width: '100%', height: '100%', margin: 0, padding: 0 }}>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: '100%', height: '100%', maxWidth: '900px' }}
        >
          <Stack mt={60}>
            {isAuthenticated ? (
              <Group justify="flex-end">
                {mode === 'view' ? (
                  <>
                    <Button variant="outline" onClick={onEdit}>
                      Edit
                    </Button>
                  </>
                ) : null}
                {id ? (
                  <Button color="red" onClick={onDelete}>
                    Delete
                  </Button>
                ) : null}
              </Group>
            ) : null}
            <ArticleCoverField mode={mode} />
            <ArticleTitleField mode={mode} />
            <ArticleAuthorField mode={mode} />
            <ArticleIntroField mode={mode} />
            <ArticleContentField mode={mode} />
            {mode === 'form' ? (
              <Flex justify="flex-end" gap="sm">
                <Button type="button" variant="default" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" loading={isCreating || isUpdating}>
                  Save
                </Button>
              </Flex>
            ) : null}
          </Stack>
        </form>
      </FormProvider>
    </div>
  )
}

export default ArticleContent
