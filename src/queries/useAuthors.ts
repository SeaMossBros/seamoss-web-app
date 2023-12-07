import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import BlogService from '@/services/blog.service'
import { Author, Author_NoRelations } from '@/types/Author'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

type QueryOptions = Omit<
  UndefinedInitialDataOptions<
    QueryResponse<Author[]>,
    Error,
    QueryResponse<Author[]>,
    (string | QueryParams<Author_NoRelations> | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export const useAuthors = (params?: QueryParams<Author_NoRelations>, options?: QueryOptions) => {
  const blogService = useService(BlogService)

  return useQuery({
    ...options,
    queryKey: BlogService.queryKeys.listAuthors(params),
    queryFn: () => blogService.listAuthors(params),
  })
}
