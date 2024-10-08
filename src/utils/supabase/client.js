import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function createSupabaseFrontendClient() {
  return createClientComponentClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}
