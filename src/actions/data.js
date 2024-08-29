import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const getUser = async () => {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) {
      return { data: null, error: error.message };
    }

    return { user, error: null };
  } catch (error) {
    return { message: error };
  }
};

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

export async function getReservaFromIdUser(idUsuario) {
  const cookieStore = cookies();

  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const { data: reservas, error: errorReserva } = await supabase
      .from('reservas')
      .select()
      .eq('id_usuario', idUsuario);

    if (errorReserva) {
      return { data: null, errorReserva: errorReserva };
    }

    return { reservas, errorReserva: null };
  } catch (error) {
    return { message: error };
  }
}
