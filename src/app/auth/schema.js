import z from 'zod';
// authentication
export const schemaSignUp = z.object({
  username: z.string().min(2, { message: 'Name is required' }),
  lastname: z.string().min(2, { message: 'Lastname is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  password: z.string().min(6, { message: 'Password must be 6 characteres' }),
});
export const schemaSignIn = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required.' })
    .email('This is not a valid email.'),
  password: z.string().min(6, { message: 'Password must be 6 characteres' }),
});

// edit cancha
export const surfaceType = ['cesped', 'hormigon'];
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const schemaEditCancha = z.object({
  name: z.string().min(1),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      // Si el archivo no existe, no se aplica validación adicional
      return !file || file.size <= MAX_UPLOAD_SIZE;
    }, 'File size must be less than 3MB')
    .refine((file) => {
      // Verificar si el archivo existe antes de comprobar el tipo
      return !file || ACCEPTED_IMAGE_TYPES.includes(file.type);
    }, 'File must be a PNG, jpg, webp'),
  surface_type: z.enum(surfaceType, {
    errorMap: () => ({ message: 'required' }),
  }),
  price: z.number().min(1),
  covered: z.boolean().default(false),
  available: z.boolean().default(true),
});
