import z from 'zod';

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
