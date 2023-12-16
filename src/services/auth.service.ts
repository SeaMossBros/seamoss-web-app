import { APP_CONFIG } from '@/config/app'
import { AuthUser, ExchangeTokenResponse, GetLoginUrlResponse } from '@/types/Auth'

export default class AuthService {
  baseURL = APP_CONFIG.STRAPI.URL

  getLoginUrl = async () => {
    const url = `${this.baseURL}/strapi-google-auth/init`

    const res = await fetch(url)

    return res.json() as Promise<GetLoginUrlResponse>
  }

  exchangeCodeForAccessToken = async (code: string) => {
    const url = `${this.baseURL}/strapi-google-auth/user-profile`

    const res = await fetch(url, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
      }),
    })

    return res.json() as Promise<ExchangeTokenResponse>
  }

  getSession = async () => {
    const url = '/api/auth/google/session'

    const res = await fetch(url)

    return res.json() as Promise<AuthUser | null>
  }

  getUserProfile = async (token: string) => {
    const url = `${this.baseURL}/strapi-google-auth/me`

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return res.json() as Promise<AuthUser>
  }
}
