import { describe, it, expect } from 'vitest';
import {
  generateSlug,
  calculateReadingTime,
  validateEmail,
  validatePhone,
  parsePaginationParams,
} from './helpers';

describe('Helpers', () => {
  describe('generateSlug', () => {
    it('should generate a valid slug', () => {
      expect(generateSlug('Hello World')).toBe('hello-world');
      expect(generateSlug('Next.js 15 Is Great!')).toBe('nextjs-15-is-great');
    });
  });

  describe('calculateReadingTime', () => {
    it('should calculate reading time correctly', () => {
      const shortContent = 'Hello world';
      expect(calculateReadingTime(shortContent)).toBe(1);

      const longContent = new Array(401).fill('word').join(' ');
      expect(calculateReadingTime(longContent)).toBe(3);
    });
  });

  describe('validateEmail', () => {
    it('should identify valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('test.name@domain.co.uk')).toBe(true);
    });

    it('should identify invalid emails', () => {
      expect(validateEmail('test@example')).toBe(false);
      expect(validateEmail('test@@example.com')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    it('should identify valid phone numbers', () => {
      expect(validatePhone('1234567890')).toBe(true);
      expect(validatePhone('+1234567890')).toBe(true);
    });
  });

  describe('parsePaginationParams', () => {
    it('should parse valid params', () => {
      const params = new URLSearchParams('page=2&limit=20');
      const { page, limit, skip } = parsePaginationParams(params);
      expect(page).toBe(2);
      expect(limit).toBe(20);
      expect(skip).toBe(20);
    });

    it('should use defaults for missing params', () => {
      const params = new URLSearchParams('');
      const { page, limit, skip } = parsePaginationParams(params);
      expect(page).toBe(1);
      expect(limit).toBe(10);
      expect(skip).toBe(0);
    });
  });
});
