import { createSupabaseFrontendClient } from '@/utils/supabase/client';
export async function createAccountAction(formData) {
  try {
    const email = formData.email;
    const password = formData.password;
    const username = formData.username;
    const lastname = formData.lastname;

    const supabase = createSupabaseFrontendClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          email,
          username,
          lastname,
        },
      },
    });

    if (error) {
      return { data: null, error: error.message };
    }

    if (data?.user?.identities?.length === 0) {
      return {
        data: null,
        error: 'Email already exist.',
      };
    }
    return { data, error: null, origin };
  } catch (error) {
    return { data: null, error: 'error al crear la cuenta' };
  }
}

export async function loginAction(formData) {
  try {
    const email = formData.email;
    const password = formData.password;

    const supabase = createSupabaseFrontendClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      let customErrorMessage;

      // Personaliza el mensaje de error basado en el error recibido
      switch (error.message) {
        case 'Invalid login credentials':
          customErrorMessage =
            'El correo electrónico o la contraseña son incorrectos.';
          break;
        case 'Network request failed':
          customErrorMessage =
            'Hubo un problema con la conexión. Inténtalo de nuevo más tarde.';
          break;
        default:
          customErrorMessage =
            'Ocurrió un error inesperado. Por favor, intenta nuevamente.';
      }

      return { data: null, error: customErrorMessage };
    }

    const { data: userId, error: errorUser } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id);

    if (errorUser) {
      return { erroGetRoleUser: errorUser };
    }

    const roleUser = userId[0].role;

    return { data, role: roleUser, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

export async function signOut() {
  try {
    const supabase = createSupabaseFrontendClient();
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export const getUser = async () => {
  try {
    const supabase = createSupabaseFrontendClient();
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {
    return { message: error };
  }
};

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

export const getCountUsers = async () => {
  const supabase = createSupabaseFrontendClient();
  try {
    const { count, error } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return { data: null, error: error };
    }

    return { data: count, error: null };
  } catch (error) {
    return { message: error };
  }
};
