import { updateSession } from '@lib/supabase/middleware'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import i18nMiddleware from "./i18n/middleware"

export async function middleware(request: NextRequest) {
  // const url = new URL(request.url)
  // const origin = url.origin
  // const pathname = url.pathname
  // request.headers.set("x-url", request.url)
  // request.headers.set("x-origin", origin)
  // request.headers.set("x-pathname", pathname)

  // return i18nRouter(request, i18nConfig);

  return await updateSession(request)

  // return i18nMiddleware(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
}
