import { describe, it, expect } from '@jest/globals';

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(\+?61|0)[2-478](?:[ -]?[0-9]){8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

describe('Email Validation', () => {
  it('validates correct email addresses', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('user.name@domain.com.au')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(validateEmail('invalid')).toBe(false);
    expect(validateEmail('test@')).toBe(false);
  });
});

describe('Phone Validation', () => {
  it('validates Australian phone numbers', () => {
    expect(validatePhone('0412345678')).toBe(true);
    expect(validatePhone('+61412345678')).toBe(true);
  });

  it('rejects invalid phone numbers', () => {
    expect(validatePhone('123')).toBe(false);
  });
});
