import { APP_CONFIG } from '@/config/app'
import { AuthUser, ExchangeTokenResponse, LoginAuthUser } from '@/types/Auth'
import axios from 'axios';

export default class AuthService {
  baseURL = APP_CONFIG.STRAPI.URL
  static queryKeys = {
    getUserInfo: (...params: Parameters<AuthService['getUserInfo']>) => [
      'https://www.googleapis.com/oauth2/v3/userinfo',
      JSON.stringify(params),
    ],
    loginUser: (...params: Parameters<AuthService['loginUser']>) => [
      'http://localhost:1337/api/auth/local',
      JSON.stringify(params),
    ],
    registerUser: (...params: Parameters<AuthService['registerUser']>) => [
      'http://localhost:1337/api/auth/local/register',
      JSON.stringify(params),
    ],
  }

  registerUser = async (username: string, email: string, password: string): Promise<LoginAuthUser | null> => {
    const response = await axios(`${this.baseURL}/api/auth/local/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    return await response.data;
  };

  loginUser = async (identifier: string, password: string): Promise<LoginAuthUser | null> => {
    if (!identifier || !password) return null;
    const response = await axios(`${this.baseURL}/api/auth/local`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ identifier, password }),
    });

    return await response.data;
  };

  // logoutUser = (): boolean => {
  //   const cookieStore = cookies();
  //   cookieStore.set('access_token', '', { expires: new Date(0) });
  //   return true;
  // }

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
        data: { code },
      }),
    })

    return res.json() as Promise<ExchangeTokenResponse>
  }

  getSession = async () => {
    const url = '/api/auth/google' // session
    const res = await fetch(url)
    return res.json() as Promise<LoginAuthUser | null>
  }

  getUserInfo = async (accessToken: string = ''): Promise<AuthUser | null> => {
    if (!accessToken) return null;

    // Use the access_token to fetch user info from Google's UserInfo endpoint
    // const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    const response = await fetch(`${this.baseURL}/auth/google/callback?access_token=${accessToken}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    // if (!response.ok) {
    //   throw new Error('Failed to fetch user info');
    // }

    return await response.json();
  }
}
