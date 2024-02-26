import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { APP_CONFIG } from './config/app'
import { LoginAuthUser } from './types/Auth'
import { getSessionFromCookies } from './lib/crypt'
// import { cookies } from 'next/headers';
// import { auth } from './lib/auth';
// import { decryptJWT } from '@/lib/crypt'

export const config = {
  matcher: ['/blogs/new', '/api/cms/:path*', '/profile'],
}

async function isAuthenticated(req: NextRequest) {
  const data: LoginAuthUser | null = await getSessionFromCookies();
  // console.log('data', data);
  if (!data || !data.user.id) {
    return false;
  }

  // console.log('cookie', cookie);
  // let decoded = await decryptJWT(token);
  // if (decoded?.exp && decoded.exp < Date.now() / 1000) {
  //   return false;
  // }
  // console.log('in isAuthenticated:::', token);
  return true;
}

const handleCMSProxy = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Authorization', `Bearer ${APP_CONFIG.STRAPI.ACCESS_TOKEN}`)

  const reqUrl = new URL(request.url)

  request.nextUrl.href = `${APP_CONFIG.STRAPI.API_URL}${reqUrl.pathname.replace('/api/cms', '')}${
    reqUrl.search
  }`
  console.log("request.nextUrl", request.nextUrl);
  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  })
}

const handlePrivatePages = async (request: NextRequest) => {
  // console.log('is in handlePrivatePages');
  const isAuthenticatedBool = await isAuthenticated(request);
  if (!isAuthenticatedBool) {
    return NextResponse.redirect(request.nextUrl.origin + '/login');
  }

  return NextResponse.next()
}

const handleLogin = (request: NextRequest) => {
  if (!isAuthenticated(request)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    })
  }

  const requestHeaders = new Headers(request.headers)
  const ref = requestHeaders.get('referer')

  return NextResponse.redirect(ref || '/')
}

export default async (request: NextRequest) => {
  // console.log('in middleware url:::', request.url); => http://localhost:3000/profile
  // console.log('--------');
  // console.log('--------');
  // console.log('--------');
  // console.log('in middleware nexturl:::', request.nextUrl);
  if (request.nextUrl.pathname.startsWith('/api/cms')) {
    return handleCMSProxy(request)
  }
  if (request.nextUrl.pathname.startsWith('/blogs/new')
    || request.nextUrl.pathname.startsWith('/profile')) {
    return handlePrivatePages(request)
  }
  if (request.nextUrl.pathname === '/login') {
    return handleLogin(request)
  }
}
