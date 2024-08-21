import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const { pathname } = req.nextUrl;

  if (!session && pathname !== '/auth/signin') {
    return NextResponse.redirect(new URL('/auth/signin', req.url));
  }

  if (session && pathname === '/auth/signin') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/cancha/:path*', '/auth/signin', '/'],
};
