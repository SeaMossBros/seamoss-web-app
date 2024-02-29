export interface AuthUser {
  id: number
  username: string
  email: string
  provider: string
  confirmationToken: string | null
  confirmed: boolean
  blocked: boolean
  createdAt: string
  updatedAt: string
  role?: {
    id: number
    name: string
    description: string
    type: 'authenticated' | 'admin' | 'public'
    createdAt: string
    updatedAt: string
  }
}

export type LoginAuthUser = {
  jwt: string
  user: AuthUser
}

export interface ExchangeTokenResponse {
  data: LoginAuthUser
  error?: unknown
}

export interface GetLoginUrlResponse {
  url: string
}
