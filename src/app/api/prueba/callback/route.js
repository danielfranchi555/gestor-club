import { NextResponse } from 'next/server';

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  if (code) {
    console.log(code);
  }
  return NextResponse.redirect(process.env.NEXT_PUBLIC_SITE_URL);
}
