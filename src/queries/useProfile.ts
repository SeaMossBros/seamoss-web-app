import { useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import AuthService from '@/services/auth.service'

export const useProfile = () => {
  const authService = useService(AuthService)

  return useQuery({
    queryKey: ['/session'],
    queryFn: () => authService.getSession(),
    gcTime: 0,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })
}
