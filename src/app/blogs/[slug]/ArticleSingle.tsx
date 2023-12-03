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

  const articleFormValues = useMemo<ArticleFormData | undefined>(
    () =>
      article?.data
        ? {
            title: article.data.attributes.title,
            cover: article.data.attributes.cover.data,
            introduction: article.data.attributes.introduction,
            content: article.data.attributes.content,
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

  return (
    <ArticleContent
      id={article?.data?.id}
      mode={mode}
      onEdit={() => setMode('form')}
      defaultValues={articleFormValues}
      isAuthenticated={isAuthenticated}
      onSaved={onSaved}
      onDeleted={onDeleted}
    />
  )
}

export default ArticleSingle
