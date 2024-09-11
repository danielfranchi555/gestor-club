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
export const schemaEditCancha = z.object({
  name: z.string().min(1),
  image: z
    .instanceof(FileList)
    .optional() // El campo ahora es opcional
    .refine(
      (files) =>
        !files ||
        files.length === 0 ||
        ['image/png', 'image/jpeg', 'image/webp'].includes(files[0]?.type),
      { message: 'Only .png, .jpg, and .webp files are accepted' },
    )
    .refine(
      (files) =>
        !files || files.length === 0 || files[0]?.size <= 5 * 1024 * 1024,
      { message: 'Image must be smaller than 5MB' },
    ),

  surface_type: z.enum(surfaceType, {
    errorMap: () => ({ message: 'required' }),
  }),
  price: z.number().min(1), // Añade validación de checkbox como booleano
  covered: z.boolean().default(false), // Añade validación de checkbox como booleano
  available: z.boolean().default(true), // Añade validación de checkbox como booleano
});
