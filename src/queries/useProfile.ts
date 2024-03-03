import { useQuery } from '@tanstack/react-query'

import { useService } from '@/hooks/useService'
import AuthService from '@/services/auth.service'

export const useProfile = (email?: string, password?: string) => {
  const authService = useService(AuthService)

  return useQuery({
    queryKey: ['/loginUser'],
    queryFn: () => authService.loginUser(email || '', password || ''),
    gcTime: 0,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })
}
