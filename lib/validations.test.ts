import { describe, it, expect } from 'vitest';
import { blogSchema, contactSchema, volunteerSchema, loginSchema } from './validations';

describe('Validations', () => {
  describe('loginSchema', () => {
    it('should validate valid login data', () => {
      const validData = { login: 'admin@bloom.org', password: 'password123' };
      const result = loginSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail on short password', () => {
      const invalidData = { login: 'admin@bloom.org', password: '123' };
      const result = loginSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('blogSchema', () => {
    it('should validate valid blog data', () => {
      const validData = {
        title: 'New Blog Post',
        excerpt: 'This is a short excerpt for the blog post.',
        content: 'This is the main content of the blog post. It should be long enough.',
        author: 'Bloom Team',
        category: 'updates',
        status: 'published',
      };
      const result = blogSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail on missing required fields', () => {
      const invalidData = { title: 'Missing Fields' };
      const result = blogSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('contactSchema', () => {
    it('should validate valid contact data', () => {
      const validData = {
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Inquiry',
        message: 'I would like to know more about your programs.',
      };
      const result = contactSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        email: 'invalid-email',
        subject: 'Inquiry',
        message: 'Message content.',
      };
      const result = contactSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('volunteerSchema', () => {
    it('should validate valid volunteer data', () => {
      const validData = {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '1234567890',
        interests: ['education'],
        skills: ['teaching'],
        availability: 'Weekends',
        message: 'I am excited to help.',
      };
      const result = volunteerSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
