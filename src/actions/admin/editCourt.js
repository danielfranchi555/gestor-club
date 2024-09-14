import { createSupabaseFrontendClient } from '@/utils/supabase/client';
const supabase = createSupabaseFrontendClient();

export const handleFile = async (file) => {
  const pathFile = `images_cancha/${file.name}`;
  const { data, error: errorUpload } = await supabase.storage
    .from('images_cancha')
    .upload(pathFile, file, { upsert: true });

  if (errorUpload) {
    return { data: null, error: errorUpload.message };
  }
  console.log('path:', data.path);

  return { path: data.path, errorUpload: null };
};

export const handleSubmitCourtEdit = async (data, id) => {
  try {
    const { path, errorUpload } = await handleFile(data.image);

    if (errorUpload) {
      return { data: null, error: errorUpload.message };
    }

    // get url from supabase
    const { data: publicUrlResponse, error } = await supabase.storage
      .from('images_cancha')
      .getPublicUrl(path);
    if (error) {
      return { publicURL: null, error: error.message };
    }

    let url = '';
    url = publicUrlResponse.publicUrl;
    const { error: errorUpdate } = await supabase
      .from('canchas')
      .update({
        ...data,
        image: url || data.image, // Usa la nueva URL o la imagen existente si no se subió una nueva
      })
      .eq('id_cancha', id);

    if (errorUpdate) {
      return { data: null, error: errorUpdate.message };
    }

    return { publicUrl: publicUrlResponse.publicUrl, error: null };
  } catch (error) {
    return { message: error };
  }
};
