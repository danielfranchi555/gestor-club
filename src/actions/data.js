import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
export async function getCanchas() {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    const { data, error } = await supabase.from('canchas').select();
    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { message: error };
  }
}

export async function getCancha(id) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  try {
    const { data, error } = await supabase
      .from('canchas')
      .select()
      .eq('id_cancha', id);

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { message: error };
  }
}
