'use client';
import { createSupabaseFrontendClient } from '@/utils/supabase/client';

// filter Reservation by date
export const orderByDate = async () => {
  const supabase = createSupabaseFrontendClient();

  try {
    const { data, error } = await supabase
      .from('reservas')
      .select()
      .order('reserva_fecha', { ascending: false });

    if (error) {
      return { data: null, error };
    }

    return { data, error: null };
  } catch (error) {
    return { message: error };
  }
};
