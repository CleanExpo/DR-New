import { validatePhone, validateEmail, validatePostcode, sanitizeInput } from '@/lib/validation';

describe('Validation Utilities', () => {
  describe('validatePhone', () => {
    it('validates Australian phone numbers', () => {
      expect(validatePhone('0412345678')).toBe(true);
      expect(validatePhone('1300123456')).toBe(true);
      expect(validatePhone('+61412345678')).toBe(true);
    });

    it('rejects invalid phone numbers', () => {
      expect(validatePhone('123')).toBe(false);
      expect(validatePhone('abcd')).toBe(false);
      expect(validatePhone('')).toBe(false);
    });

    it('handles various phone formats', () => {
      expect(validatePhone('04 1234 5678')).toBe(true);
      expect(validatePhone('(07) 3123 4567')).toBe(true);
      expect(validatePhone('07-3123-4567')).toBe(true);
    });
  });

  describe('validateEmail', () => {
    it('validates correct email addresses', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.com.au')).toBe(true);
    });

    it('rejects invalid email addresses', () => {
      expect(validateEmail('notanemail')).toBe(false);
      expect(validateEmail('@nodomain.com')).toBe(false);
      expect(validateEmail('noatsign.com')).toBe(false);
    });

    it('handles edge cases', () => {
      expect(validateEmail('')).toBe(false);
      expect(validateEmail('a@b.c')).toBe(true);
      expect(validateEmail('test+tag@example.com')).toBe(true);
    });
  });

  describe('validatePostcode', () => {
    it('validates Queensland postcodes', () => {
      expect(validatePostcode('4000')).toBe(true); // Brisbane CBD
      expect(validatePostcode('4305')).toBe(true); // Ipswich
      expect(validatePostcode('4114')).toBe(true); // Logan
    });

    it('validates other Australian postcodes', () => {
      expect(validatePostcode('2000')).toBe(true); // Sydney
      expect(validatePostcode('3000')).toBe(true); // Melbourne
    });

    it('rejects invalid postcodes', () => {
      expect(validatePostcode('123')).toBe(false);
      expect(validatePostcode('abcd')).toBe(false);
      expect(validatePostcode('12345')).toBe(false);
    });
  });

  describe('sanitizeInput', () => {
    it('removes XSS attempts', () => {
      const malicious = '<script>alert("xss")</script>';
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('<script>');
    });

    it('preserves safe HTML', () => {
      const safe = 'Hello <b>World</b>';
      const sanitized = sanitizeInput(safe);
      expect(sanitized).toContain('Hello');
      expect(sanitized).toContain('World');
    });

    it('handles SQL injection attempts', () => {
      const malicious = "'; DROP TABLE users; --";
      const sanitized = sanitizeInput(malicious);
      expect(sanitized).not.toContain('DROP TABLE');
    });

    it('trims whitespace', () => {
      const input = '  test  ';
      const sanitized = sanitizeInput(input);
      expect(sanitized).toBe('test');
    });
  });
});
