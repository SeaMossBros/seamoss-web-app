'use client'

import { useMemo } from 'react'

import ArticleContent from '@/components/ArticleContent'
import { useArticle } from '@/queries/useArticle'
import { Article_NoRelations } from '@/types/Article'
import { ArticleFormData } from '@/types/ArticleForm'
import { QueryParams } from '@/types/QueryParams'

export type ArticleSingleProps = {
  slug: string
  queryParams?: QueryParams<Article_NoRelations>
}

const ArticleSingle: React.FC<ArticleSingleProps> = ({ slug, queryParams }) => {
  const { data: article } = useArticle(slug, queryParams)

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

  return <ArticleContent mode="view" defaultValues={articleFormValues} />
}

export default ArticleSingle
