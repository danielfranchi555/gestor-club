import { createSupabaseFrontendClient } from '@/utils/supabase/client';
const supabase = createSupabaseFrontendClient();

export const handleFile = async (file) => {
  const { data, error } = await supabase.storage
    .from('images-cancha')
    .upload(file);

  if (error) {
    return { data: null, error: error.message };
  }

  return data.key;
};

export const handleSubmitCourtEdit = async (data, id) => {
  const { error } = await supabase
    .from('canchas')
    .update(data)
    .eq('id_cancha', id);

  if (error) {
    console.log(error);
  }
};
