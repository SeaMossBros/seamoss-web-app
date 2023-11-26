import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { APP_CONFIG } from './config/app'

export const config = {
  matcher: '/api/cms/:path*',
}

export function middleware(request: NextRequest) {
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
