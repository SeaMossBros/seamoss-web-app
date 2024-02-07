import { APP_CONFIG } from '@/config/app'
import { AuthUser, ExchangeTokenResponse } from '@/types/Auth'
import { UserType } from '@/types/User';

export default class AuthService {
  baseURL = APP_CONFIG.STRAPI.URL
  static queryKeys = {
    getUserInfo: (...params: Parameters<AuthService['getUserInfo']>) => [
      'https://www.googleapis.com/oauth2/v3/userinfo',
      JSON.stringify(params),
    ],
    loginAdmin: (...params: Parameters<AuthService['loginAdmin']>) => [
      'http://localhost:1337/api/auth/local',
      JSON.stringify(params),
    ],
  }

  loginAdmin = async (username: string, password: string) => {
    const response = await fetch(`${this.baseURL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier: username, password: password }),
    });
    const data = await response.json();
    return data.jwt; // Use this token in the Authorization header
  }

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

  getUserInfo = async (accessToken: string = ''): Promise<UserType> => {
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
