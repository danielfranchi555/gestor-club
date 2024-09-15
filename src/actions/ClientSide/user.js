import { createSupabaseFrontendClient } from '@/utils/supabase/client';

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
