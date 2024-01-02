import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import BlogService from '@/services/blog.service'
import { Author, Author_Plain } from '@/types/Author'
import { QueryParams } from '@/types/QueryParams'
import { QueryResponse } from '@/types/QueryResponse'

type QueryOptions = Omit<
  UndefinedInitialDataOptions<
    QueryResponse<Author_Plain[]>,
    Error,
    QueryResponse<Author[]>,
    (string | QueryParams<Author_Plain> | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export const useAuthors = (params?: QueryParams<Author_Plain>, options?: QueryOptions) => {
  const blogService = useService(BlogService)

  return useQuery({
    ...options,
    queryKey: BlogService.queryKeys.listAuthorsWithAvatar(params),
    queryFn: () => blogService.listAuthorsWithAvatar(params),
  })
}
