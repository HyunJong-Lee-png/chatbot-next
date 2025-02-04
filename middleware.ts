import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_ROUTES, BASE_URL, PUBLIC_ROUTES } from './constant/route';
import { verify } from './actions/sessions';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);
  const token = request.cookies.get('session')?.value;
  const payload = await verify(token);

  //로그인 안햇는데 로그인이 필요한 페이지에 접근하는 경우
  if (!isPublicRoute && !token) {
    console.log('미들웨어.ts파일 콘솔')
    return NextResponse.redirect(new URL(AUTH_ROUTES.LOGIN, request.nextUrl));
  }

  //로그인 했는데 다시 로그인이나 회원가입 페이지에 접근하는 경우
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL(BASE_URL, request.nextUrl))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}