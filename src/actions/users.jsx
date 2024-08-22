import { createSupabaseFrontendClient } from '@/utils/supabase/client';
export async function createAccountAction(formData) {
  try {
    // const name = formData.name;
    // const lastname = formData.email;
    const email = formData.email;
    const password = formData.password;

    const supabase = createSupabaseFrontendClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/callback`,
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

    const { auth } = createSupabaseFrontendClient();
    const { data, error } = await auth.signInWithPassword({
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

    return { data, error: null };
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
    return { error };
  }
};
