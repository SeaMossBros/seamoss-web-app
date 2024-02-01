import { APP_CONFIG } from '@/config/app'
import { AuthUser, ExchangeTokenResponse, GetLoginUrlResponse } from '@/types/Auth'
import { User } from '@/types/User';

export default class AuthService {
  static queryKeys = {
    getUserInfo: (...params: Parameters<AuthService['getUserInfo']>) => [
      'https://www.googleapis.com/oauth2/v3/userinfo',
      JSON.stringify(params),
    ],
  }
  baseURL = APP_CONFIG.STRAPI.URL

  getGoogleLoginUrl = () => {
    const url = `${this.baseURL}/api/connect/google`;
    window.location.href = url;  // Redirect the browser
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

  getUserInfo = async (accessToken: string = ''): Promise<User> => {
    if (!accessToken) return {
      email: '',
      email_verified: false,
      picture: '',
      sub: ''
    };

    // Use the access_token to fetch user info from Google's UserInfo endpoint
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user info');
    }

    return response.json();
  }
}
