import { useQuery } from '@tanstack/react-query'

import SingleTypeService from '@/services/single-type.service'

export const useHomePage = () => {
  const singleTypeService = new SingleTypeService()

  return useQuery({
    queryKey: SingleTypeService.queryKeys.getHomePageData(),
    queryFn: () => singleTypeService.getHomePageData(),
    select: (res) => res.data,
  })
}
