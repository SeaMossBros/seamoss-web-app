import { UndefinedInitialDataOptions, useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import SearchService from '@/services/search.service'
import { SearchParams, SearchResponse } from '@/types/Search'

type QueryOptions = Omit<
  UndefinedInitialDataOptions<
    SearchResponse,
    Error,
    SearchResponse,
    (string | SearchParams | undefined)[]
  >,
  'queryKey' | 'queryFn'
>

export const useSearch = (query: string, params?: SearchParams, options?: QueryOptions) => {
  const searchService = useService(SearchService)

  return useQuery({
    ...options,
    queryKey: SearchService.queryKeys.search(query, params),
    queryFn: () => searchService.search(query, params),
  })
}
