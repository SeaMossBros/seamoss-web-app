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
    type: string
    createdAt: string
    updatedAt: string
  }
}

export interface GetLoginUrlResponse {
  url: string
}

export interface ExchangeTokenResponse {
  data: {
    token: string
    user: AuthUser
  }
  error?: unknown
}
