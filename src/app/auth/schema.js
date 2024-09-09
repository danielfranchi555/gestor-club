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
  nameCancha: z.string().min(3, { message: 'name is required' }),
  surface: z.enum(surfaceType, { errorMap: () => ({ message: 'dasd' }) }),
});
