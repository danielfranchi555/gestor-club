import { NextResponse } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

export async function middleware(req) {
  const res = NextResponse.next();

  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.rewrite(new URL('/auth/signin', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/cancha/:path*', '/admin/:path*', '/reservas'],
};
