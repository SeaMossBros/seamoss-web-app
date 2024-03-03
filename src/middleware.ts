import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { APP_CONFIG } from './config/app'
import { getSessionFromCookies } from './lib/crypt'
import { AuthUser } from './types/Auth'

export const config = {
  matcher: ['/blogs/new', '/api/cms/:path*', '/profile/:path*'],
}

async function isAuthenticated() {
  const data: AuthUser | null = await getSessionFromCookies()
  // console.log('data in middleware:::', data);
  return !(!data || !data.id)
}

const handleCMSProxy = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Authorization', `Bearer ${APP_CONFIG.STRAPI.ACCESS_TOKEN}`)

  const reqUrl = new URL(request.url)

  request.nextUrl.href = `${APP_CONFIG.STRAPI.API_URL}${reqUrl.pathname.replace('/api/cms', '')}${
    reqUrl.search
  }`
  // console.log('request.nextUrl', request.nextUrl)
  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  })
}

const handlePrivatePages = async (request: NextRequest) => {
  const isAuthenticatedBool = await isAuthenticated()
  // console.log('isAuthenticatedBool', isAuthenticatedBool)
  if (!isAuthenticatedBool) {
    return NextResponse.redirect(request.nextUrl.origin + '/login')
  }

  // console.log('request', request.nextUrl.href)
  // console.log('request.nextUrl.origin + request.nextUrl.pathname:::', request.nextUrl.origin + request.nextUrl.pathname); // http://localhost:3000/profile
  // return NextResponse.redirect(request.nextUrl.origin + request.nextUrl.pathname)
  return NextResponse.next()
}

const handleLogin = async (_: NextRequest) => {
  const isAuthenticatedBool = await isAuthenticated()
  if (!isAuthenticatedBool) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    })
  }

  // const requestHeaders = new Headers(request.headers)
  // const ref = requestHeaders.get('referer')

  return NextResponse.next()
}

const middleware = async (request: NextRequest) => {
  // console.log('--------')
  // console.log('in middleware url:::', request.url); // => http://localhost:3000/profile
  // console.log('in middleware nextUrl pathname:::', request.nextUrl.pathname)
  if (request.nextUrl.pathname.startsWith('/api/cms')) {
    return handleCMSProxy(request)
  }
  if (
    request.nextUrl.pathname.startsWith('/blogs/new') ||
    request.nextUrl.pathname.includes('/profile')
  ) {
    return handlePrivatePages(request)
  }
  if (request.nextUrl.pathname === '/login') {
    return handleLogin(request)
  }
}

export default middleware
