import { z } from 'zod';
import { BLOG_STATUSES, BLOG_CATEGORIES, MESSAGE_STATUSES, ADMIN_ROLES } from './constants';

/**
 * AUTH VALIDATIONS
 */
export const loginSchema = z.object({
  login: z.string().min(3, 'Login must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

/**
 * BLOG VALIDATIONS
 */
export const blogSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100),
  excerpt: z.string().min(10, 'Excerpt must be at least 10 characters').max(300),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  author: z.string().min(2, 'Author name must be at least 2 characters'),
  tags: z.array(z.string()).optional().default([]),
  category: z.enum(BLOG_CATEGORIES).optional().default('updates'),
  coverImage: z.string().url('Invalid cover image URL').optional().or(z.literal('')),
  seoTitle: z.string().max(60).optional(),
  seoDescription: z.string().max(160).optional(),
  status: z.enum(BLOG_STATUSES).optional().default('draft'),
});

/**
 * CONTACT VALIDATIONS
 */
export const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

/**
 * VOLUNTEER VALIDATIONS
 */
export const volunteerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  interests: z.array(z.string()).min(1, 'Please select at least one interest'),
  skills: z.array(z.string()).min(1, 'Please select at least one skill'),
  availability: z.string().min(5, 'Please provide your availability'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

/**
 * ADMIN ACCOUNT VALIDATIONS
 */
export const adminAccountSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  role: z.enum(ADMIN_ROLES).optional().default('viewer'),
});

export const partialAdminAccountSchema = adminAccountSchema.partial();

/**
 * ACCOUNT CLAIM VALIDATIONS
 */
export const claimSchema = z.object({
  identifier: z.string().min(3, 'Email or username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

/**
 * MESSAGE VALIDATIONS
 */
export const messageUpdateSchema = z.object({
  status: z.enum(MESSAGE_STATUSES),
});
