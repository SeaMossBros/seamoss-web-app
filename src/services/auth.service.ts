import axios from 'axios'

import { APP_CONFIG } from '@/config/app'
import { AuthUser, ExchangeTokenResponse, LoginAuthUser } from '@/types/Auth'

import CMSService from './core/cms.service'

export default class AuthService extends CMSService {
  baseUrl = APP_CONFIG.STRAPI.URL
  static queryKeys = {
    getUserInfo: (...params: Parameters<AuthService['getUserInfo']>) => [
      'https://www.googleapis.com/oauth2/v3/userinfo',
      JSON.stringify(params),
    ],
    loginUser: (...params: Parameters<AuthService['loginUser']>) => [
      `${APP_CONFIG.STRAPI.URL}/api/auth/local`,
      JSON.stringify(params),
    ],
    registerUser: (...params: Parameters<AuthService['registerUser']>) => [
      `${APP_CONFIG.STRAPI.URL}/api/auth/local/register`,
      JSON.stringify(params),
    ],
  }

  registerUser = async (
    username: string,
    email: string,
    password: string,
  ): Promise<LoginAuthUser | null> => {
    try {
      const response = await axios(`${this.baseUrl}/api/auth/local/register`, {
        method: 'POST',
        headers: {
          ...this.headers,
          'Content-Type': 'application/json',
        },
        data: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      // console.log('response in registerUser::', response);

      // console.log('data in registerUser', response.data);
      // const emailConfirmationLinkRes = await this.sendEmailConfirmationLink(email);
      // console.log('emailConfirmationLinkRes::', emailConfirmationLinkRes);

      return response.data
    } catch (err) {
      console.log('err', err)
      throw new Error(JSON.stringify({ message: err }))
    }
  }

  loginUser = async (identifier: string, password: string): Promise<LoginAuthUser | null> => {
    if (!identifier || !password) return null
    try {
      const response = await axios(`${this.baseUrl}/api/auth/local`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({ identifier, password }),
      })

      if (!response.data?.jwt) return null

      const userRes = await axios(`${this.baseUrl}/api/users/me?populate=role`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${response.data.jwt}`,
        },
      })

      return { user: userRes.data, jwt: response.data.jwt }
    } catch (err) {
      console.log('err', err)
      throw new Error(JSON.stringify({ message: err }))
    }
  }

  changePassword = async (
    password: string,
    newPassword: string,
    confirmNewPassword: string,
    jwt: string,
  ) => {
    if (!newPassword || !confirmNewPassword || !password) return null

    try {
      await axios(`${this.baseUrl}/api/auth/change-password`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        data: JSON.stringify({ password, newPassword, confirmNewPassword }),
      })

      // console.log('response', response)

      return
    } catch (err) {
      console.log('err', err)
      throw new Error(JSON.stringify({ message: err }))
    }
  }

  sendForgotPasswordLinkToEmail = async (email: string) => {
    if (!email) return null

    try {
      const res = await axios(`${this.baseUrl}/api/auth/forgot-password`, {
        method: 'POST',
        headers: this.headers,
        data: JSON.stringify({ email }),
      })

      console.log('res', res)

      return res.data
    } catch (err) {
      console.error('err', err)
      throw new Error(JSON.stringify({ message: err }))
    }
  }

  sendEmailConfirmationLink = async (email: string): Promise<string | null> => {
    const response = await axios(`${this.baseUrl}/api/auth/send-email-confirmation`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({ email }),
    })

    return await response.data
  }

  getGoogleLoginUrl = () => {
    const url = `${this.baseUrl}/api/connect/google`
    window.location.href = url // Redirect the browser
  }

  exchangeCodeForAccessToken = async (code: string) => {
    const url = `${this.baseUrl}/strapi-google-auth/user-profile`

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
    if (!accessToken) return null

    // Use the access_token to fetch user info from Google's UserInfo endpoint
    // const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    const response = await fetch(
      `${this.baseUrl}/auth/google/callback?access_token=${accessToken}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )

    // if (!response.ok) {
    //   throw new Error('Failed to fetch user info');
    // }

    return await response.json()
  }
}
