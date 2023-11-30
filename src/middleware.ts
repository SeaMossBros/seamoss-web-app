import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { APP_CONFIG } from './config/app'

const [AUTH_USER, AUTH_PASS] = (process.env.HTTP_BASIC_AUTH || ':').split(':')

export const config = {
  matcher: ['/blogs/new', '/api/cms/:path*'],
}

function isAuthenticated(req: NextRequest) {
  const authheader = req.headers.get('authorization') || req.headers.get('Authorization')

  if (!authheader) {
    return false
  }

  const auth = Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':')
  const user = auth[0]
  const pass = auth[1]

  if (user == AUTH_USER && pass == AUTH_PASS) {
    return true
  } else {
    return false
  }
}

const handleCMSProxy = (request: NextRequest) => {
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('Authorization', `Bearer ${APP_CONFIG.STRAPI.ACCESS_TOKEN}`)

  const reqUrl = new URL(request.url)

  request.nextUrl.href = `${APP_CONFIG.STRAPI.API_URL}${reqUrl.pathname.replace('/api/cms', '')}${
    reqUrl.search
  }`

  return NextResponse.rewrite(request.nextUrl, {
    request: {
      headers: requestHeaders,
    },
  })
}

const handlePrivatePages = (request: NextRequest) => {
  if (!isAuthenticated(request)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic' },
    })
  }

  return NextResponse.next()
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/cms')) {
    return handleCMSProxy(request)
  }
  if (request.nextUrl.pathname.startsWith('/blogs/new')) {
    return handlePrivatePages(request)
  }
}
