import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import BlogService from '@/services/blog.service'
import { Article, Article_NoRelations } from '@/types/Article'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

type QueryOptions = Omit<
  UndefinedInitialDataOptions<
    QueryResponse<Article>,
    Error,
    QueryResponse<Article>,
    (string | QueryParams<Article_NoRelations> | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export const useArticle = (
  slug: string,
  params?: QueryParams<Article_NoRelations>,
  options?: QueryOptions,
) => {
  const blogService = useService(BlogService)

  return useQuery({
    ...options,
    queryKey: BlogService.queryKeys.getBySlug(slug, params),
    queryFn: () => blogService.getBySlug(slug, params),
  })
}
