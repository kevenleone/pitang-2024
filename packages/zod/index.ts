import z from 'zod';

export const authSchema = z.object({
  email: z.string(),
  password: z.string().min(4),
});

export const shortnerSchema = z.object({
  createdAt: z.date().optional(),
  createdBy: z.string().optional(),
  hash: z.string().optional(),
  hits: z.number().positive().default(0).optional(),
  id: z.string().optional(),
  url: z.string().url('O link que você passou está inválido.'),
});

export const userSchema = authSchema.extend({
  firstName: z.string().min(3).max(20),
  lastName: z.string().min(3).max(20),
});
