import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Ignore /admin/login to avoid infinite redirects
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const authCookie = req.cookies.get('admin_auth')?.value

    if (authCookie !== 'faivyyy23') {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
}
