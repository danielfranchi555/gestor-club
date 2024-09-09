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

  const { data: user } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single();

  const path = req.nextUrl.pathname;

  if (user.role === 'admin' && path.startsWith('/auth/signin')) {
    // Redirigir a /admin si es un admin tratando de acceder a rutas de usuario
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/', '/cancha/:path*', '/admin/', '/admin/:path*', '/reservas'],
};
