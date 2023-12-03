import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import BlogService from '@/services/blog.service'
import { Article, Article_Plain } from '@/types/Article'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

type QueryOptions = Omit<
  UndefinedInitialDataOptions<
    QueryResponse<Article[]>,
    Error,
    QueryResponse<Article[]>,
    (string | QueryParams<Article_Plain> | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export const useArticles = (params: QueryParams<Article_Plain>, options?: QueryOptions) => {
  const blogService = useService(BlogService)

  return useQuery({
    ...options,
    queryKey: BlogService.queryKeys.list(params),
    queryFn: () => blogService.list(params),
  })
}
