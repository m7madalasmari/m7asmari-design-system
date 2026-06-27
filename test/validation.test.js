import { describe, it, expect } from 'vitest';
import { required, email, minLength, maxLength, matches, saudiPhone, validate, validateForm } from '../app/lib/validation.js';

describe('validation rules', () => {
  it('required', () => {
    expect(required()('')).toBeTruthy();
    expect(required()('  ')).toBeTruthy();
    expect(required()(false)).toBeTruthy();
    expect(required()('x')).toBe('');
  });
  it('email', () => {
    expect(email()('a@b.com')).toBe('');
    expect(email()('')).toBe(''); // الفراغ يتركه لـ required
    expect(email()('bad')).toBeTruthy();
  });
  it('minLength / maxLength', () => {
    expect(minLength(3)('ab')).toBeTruthy();
    expect(minLength(3)('abc')).toBe('');
    expect(maxLength(3)('abcd')).toBeTruthy();
    expect(maxLength(3)('abc')).toBe('');
  });
  it('matches (قيمة أو دالّة)', () => {
    expect(matches('x')('x')).toBe('');
    expect(matches('x')('y')).toBeTruthy();
    expect(matches(() => 'z')('z')).toBe('');
  });
  it('saudiPhone', () => {
    expect(saudiPhone()('0512345678')).toBe('');
    expect(saudiPhone()('+966512345678')).toBe('');
    expect(saudiPhone()('123')).toBeTruthy();
  });
});

describe('validate / validateForm', () => {
  it('validate يعيد أوّل خطأ في السلسلة', () => {
    expect(validate('', [required(), email()])).toBe(required()(''));
    expect(validate('a@b.com', [required(), email()])).toBe('');
  });
  it('validateForm يجمع الأخطاء ويحسب valid', () => {
    const { errors, valid } = validateForm(
      { name: '', mail: 'a@b.com' },
      { name: [required()], mail: [required(), email()] }
    );
    expect(valid).toBe(false);
    expect(errors.name).toBeTruthy();
    expect(errors.mail).toBeUndefined();
  });
});
