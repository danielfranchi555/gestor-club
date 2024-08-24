import { createSupabaseClient } from '@/utils/supabase/server';

export async function getCanchas() {
  const supabase = createSupabaseClient();
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
  const supabase = createSupabaseClient();
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
