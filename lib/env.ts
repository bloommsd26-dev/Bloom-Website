import { z } from 'zod';

const envSchema = z.object({
  // DATABASE
  MONGODB_URI: z.string().url('MONGODB_URI must be a valid URL'),

  // AUTH
  JWT_SECRET: z.string().min(32, 'JWT_SECRET must be at least 32 characters'),
  ADMIN_EMAIL: z.string().email().optional(),
  ADMIN_PASSWORD: z.string().min(8).optional(),
  ADMIN_USERNAME: z.string().min(3).optional(),

  // SITE
  NEXT_PUBLIC_SITE_URL: z.string().url().default('http://localhost:3000'),

  // SENTRY
  NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),

  // VERCEL BLOB
  BLOB_READ_WRITE_TOKEN: z.string().optional(),

  // VERCEL (automatically set by Vercel)
  VERCEL_ENV: z.enum(['production', 'preview', 'development']).optional(),
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
});

const result = envSchema.safeParse(process.env);

if (!result.success) {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    console.error('❌ Invalid environment variables:', result.error.flatten().fieldErrors);
    throw new Error('Invalid environment variables');
  } else {
    // On the client, we only care if NEXT_PUBLIC_ variables are invalid
    const publicErrors = Object.keys(result.error.flatten().fieldErrors).filter((key) =>
      key.startsWith('NEXT_PUBLIC_')
    );
    if (publicErrors.length > 0) {
      console.error('❌ Invalid client-side environment variables:', result.error.flatten().fieldErrors);
      throw new Error('Invalid environment variables');
    }
    // If only server-side variables are missing on the client, it's fine.
  }
}

export const env = result.success ? result.data : (process.env as unknown as z.infer<typeof envSchema>);
