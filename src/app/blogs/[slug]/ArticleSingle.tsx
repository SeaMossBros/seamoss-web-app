'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'

import ArticleContent from '@/components/ArticleContent'
import { ROUTE_PATHS } from '@/consts/route-paths'
import { useArticle } from '@/queries/useArticle'
import { Article, Article_NoRelations } from '@/types/Article'
import { ArticleFormData } from '@/types/ArticleForm'
import { QueryParams } from '@/types/QueryParams'

export type ArticleSingleProps = {
  slug: string
  queryParams?: QueryParams<Article_NoRelations>
  isAuthenticated?: boolean
}

const ArticleSingle: React.FC<ArticleSingleProps> = ({ slug, queryParams, isAuthenticated }) => {
  const router = useRouter()
  const { data: article } = useArticle(slug, queryParams)
  const [mode, setMode] = useState<'view' | 'form'>('view')

  // console.log('on page');
  // console.log('article:', article);
  // console.log('article data:', article?.data);

  const articleFormValues = useMemo<ArticleFormData | undefined>(
    () =>
      article?.data
        ? {
            title: article.data.attributes.title,
            cover: article.data.attributes.cover.data,
            introduction: article.data.attributes.introduction,
            content: article.data.attributes.content,
            author: article.data.attributes.author?.data
              ? {
                  ...article.data.attributes.author.data.attributes,
                  id: article.data.attributes.author.data.id,
                  avatar: article.data.attributes.author.data.attributes.avatar?.data,
                }
              : undefined,
          }
        : undefined,
    [article?.data],
  )

  const onSaved = useCallback((data: Article) => {
    const {
      attributes: { slug },
    } = data
    if (!slug) return
    window.location.assign(ROUTE_PATHS.BLOG.SINGULAR.replaceAll('{slug}', slug))
  }, [])

  const onDeleted = useCallback(() => {
    router.replace(ROUTE_PATHS.BLOG.INDEX)
  }, [router])

  const onCancel = useCallback(() => {
    setMode('view')
  }, [])

  if (!article) return null

  return (
    <ArticleContent
      id={article?.data?.id}
      mode={mode}
      onEdit={() => setMode('form')}
      defaultValues={articleFormValues}
      isAuthenticated={isAuthenticated}
      onSaved={onSaved}
      onDeleted={onDeleted}
      onCancel={onCancel}
    />
  )
}

export default ArticleSingle
