import { useQuery } from '@tanstack/react-query'

import SingleTypeService from '@/services/single-type.service'

export const useAboutUsPage = () => {
  const singleTypeService = new SingleTypeService()

  return useQuery({
    queryKey: SingleTypeService.queryKeys.getAboutUsPageData(),
    queryFn: () => singleTypeService.getAboutUsPageData(),
    select: (res) => res.data,
  })
}
