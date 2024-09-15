import { createSupabaseFrontendClient } from '@/utils/supabase/client';

export async function deleteReservation(idReserva) {
  const supabase = createSupabaseFrontendClient();

  try {
    const response = await supabase
      .from('reservas')
      .delete()
      .eq('id_reserva', idReserva);
    return { response };
  } catch (error) {
    return { message: error };
  }
}
