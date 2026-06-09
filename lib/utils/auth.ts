import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import type { JWTPayload } from 'jose';
import { env } from '@/lib/env';

const SALT_ROUNDS = 10;
const JWT_SECRET_ENCODED = new TextEncoder().encode(env.JWT_SECRET);

export const AUTH_COOKIE_NAME = 'bloom_admin_token';

export type AuthPayload = JWTPayload & {
  id: string;
  email: string;
  username?: string;
  role: 'super_admin' | 'admin' | 'editor' | 'viewer';
};

/**
 * Node.js only: Hash a password
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Node.js only: Compare a password with a hash
 */
export async function comparePasswords(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Edge & Node.js: Generate a secure JWT
 */
export async function generateToken(
  payload: AuthPayload,
  expiresIn: string = '7d'
): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET_ENCODED);
}

/**
 * Edge & Node.js: Verify a JWT
 */
export async function verifyToken(token: string): Promise<AuthPayload | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET_ENCODED);
    return payload as AuthPayload;
  } catch (error) {
    return null;
  }
}

/**
 * Node.js only (legacy helper)
 */
export async function validateCredentials(password: string, hash: string): Promise<boolean> {
  return comparePasswords(password, hash);
}
