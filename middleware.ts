import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const authCookie = req.cookies.get('admin_auth')?.value
  const isAdmin = authCookie === 'faivyyy23'

  // Ignore /admin/login to avoid infinite redirects
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!isAdmin) {
      const loginUrl = new URL('/admin/login', req.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Coming soon feature (only for non-admin visitors)
  // Force le masquage du site pour tout le public
  const isComingSoon = true
  if (isComingSoon) {
    if (!isAdmin && !pathname.startsWith('/admin')) {
      const requestHeaders = new Headers(req.headers)
      requestHeaders.set('x-coming-soon', 'true')
      
      if (pathname !== '/coming-soon') {
        return NextResponse.rewrite(new URL('/coming-soon', req.url), {
          request: {
            headers: requestHeaders,
          },
        })
      }

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
