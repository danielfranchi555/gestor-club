import { createSupabaseFrontendClient } from '@/utils/supabase/client';
import { v4 as uuidv4 } from 'uuid';

const supabase = createSupabaseFrontendClient();

// HandleFileImage
export const handleFile = async (file) => {
  const pathFile = `/${uuidv4()}_${file.name}`;
  const { data, error: errorUpload } = await supabase.storage
    .from('images_cancha')
    .upload(pathFile, file, { upsert: true });

  if (errorUpload) {
    return { data: null, error: errorUpload.message };
  }
  console.log('path:', data.path);

  return { path: data.path, errorUpload: null };
};

// add new court
export const addCourt = async (data) => {
  const { name, image, available, covered, price, surface } = data;

  // verify if exist court with this name
  const { data: existingCourts, error: checkError } = await supabase
    .from('canchas')
    .select('name')
    .eq('name', name) // Compara el nombre
    .single(); // Solo queremos un resultado

  if (checkError && checkError.code !== 'PGRST116') {
    // Manejar el error específico si no existe
    return { message: checkError.message };
  }

  if (existingCourts) {
    return { message: 'The court name already exists.' }; // O puedes lanzar un error o devolver un mensaje específico
  }

  // upload file image
  const { path, errorUpload } = await handleFile(image);

  if (errorUpload) {
    return { message: 'error upload file', url: path };
  }

  // get url image
  const { data: publicUrlResponse, error } = await supabase.storage
    .from('images_cancha')
    .getPublicUrl(path);
  if (error) {
    return { publicURL: null, error: error.message };
  }

  const { error: errorInsertCourt } = await supabase.from('canchas').insert({
    name,
    image: publicUrlResponse.publicUrl,
    available,
    covered,
    price,
    surface_type: surface,
  });

  if (errorInsertCourt) {
    return { message: 'error insert Court' };
  } else {
    return { message: 'Court inserted success' };
  }
};

// Edit Court
export const handleSubmitCourtEdit = async (data, id) => {
  try {
    let url = data.image; // Mantén la imagen existente si no hay una nueva

    // Solo intenta subir una nueva imagen si se ha seleccionado una
    if (data.image instanceof File) {
      const { path, errorUpload } = await handleFile(data.image);

      if (errorUpload) {
        return { data: null, error: errorUpload.message };
      }

      // Obtener la URL pública de la nueva imagen subida
      const { data: publicUrlResponse, error } = await supabase.storage
        .from('images_cancha')
        .getPublicUrl(path);

      if (error) {
        return { publicURL: null, error: error.message };
      }

      url = publicUrlResponse.publicUrl; // Asignar la nueva URL de la imagen
    }

    // Realiza la actualización en la tabla 'canchas' con o sin una nueva imagen
    const { error: errorUpdate } = await supabase
      .from('canchas')
      .update({
        ...data, // Actualiza los otros campos
        image: url, // Mantiene la imagen existente si no se selecciona una nueva
      })
      .eq('id_cancha', id);

    if (errorUpdate) {
      return { data: null, error: errorUpdate.message };
    } else {
      return { publicUrl: url, error: null };
    }
  } catch (error) {
    return { message: error };
  }
};
