import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { pathname } = req.nextUrl;

  const authPaths = ['/register', '/login'];
  const isAuthPage = authPaths.includes(pathname);

  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL('/register', req.url));
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
