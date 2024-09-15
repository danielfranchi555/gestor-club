import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

// Get Count Reservations
export const getCountReservations = async () => {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  try {
    const { count, error } = await supabase
      .from('reservas')
      .select('*', { count: 'exact', head: true }); // Selecciona el conteo exacto sin traer los datos

    if (error) {
      return { data: null, error: error.message };
    }

    return { data: count, error: null };
  } catch (error) {
    return { message: error };
  }
};
