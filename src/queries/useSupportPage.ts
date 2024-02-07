import { useQuery } from '@tanstack/react-query'
import { useService } from '@/hooks/useService'

import SingleTypeService from '@/services/single-type.service'

export const useSupportPage = () => {
    const singleTypeService = useService(SingleTypeService)

    // return useQuery({ // TODO: Fix
    //     queryKey: SingleTypeService.queryKeys.getSupportPageData(),
    //     queryFn: () => singleTypeService.getSupportPageData(),
    //     select: (res) => res.data,
    // })
}