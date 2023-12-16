import { useQuery } from '@tanstack/react-query'
import { createContext, PropsWithChildren } from 'react'

import { useService } from '@/hooks/useService'
import AuthService from '@/services/auth.service'
import { AuthUser } from '@/types/Auth'

interface SessionContextValue {
  user: AuthUser | null
}

const SessionContext = createContext<SessionContextValue>({
  user: null,
})

const SessionProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const authService = useService(AuthService)
  const { data: user = null } = useQuery({
    queryKey: ['/session'],
    queryFn: () => authService.getSession(),
    gcTime: 0,
    refetchInterval: 5 * 60 * 1000, // 5 minutes
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  })

  return (
    <SessionContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </SessionContext.Provider>
  )
}

export default SessionProvider
