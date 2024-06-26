import { z } from 'zod';

const envSchema = z.object({
  JWT_SECRET: z.string(),
  PORT: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
