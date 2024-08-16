'use server';
import { createSupabaseServerClient } from '@/utils/supabase/server';

export async function createAccountAction(formData) {
  try {
    // const name = formData.name;
    // const lastname = formData.email;
    const email = formData.email;
    const password = formData.password;

    const { auth } = createSupabaseServerClient();

    const { data, error } = await auth.signUp({ email, password });

    if (error) {
      return { data: null, error: error.message };
    }

    if (data?.user?.identities?.length === 0) {
      return {
        data: null,
        error: 'Email already exist.',
      };
    }
    return { data, error: null };
  } catch (error) {
    console.log(error);
  }
}

export async function loginAction(formData) {
  try {
    const email = formData.email;
    const password = formData.password;

    const { auth } = createSupabaseServerClient();
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
    console.log(error);
  }
}

export async function signOut() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.auth.signOut();
    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error) {}
}
