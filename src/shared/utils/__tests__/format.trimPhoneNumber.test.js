import { trimPhoneNumber } from '../format';

describe('Format.trimPhoneNumber', () => {
  it('should return empty string if phone number is undefined', () => {
    expect(trimPhoneNumber()).toBe('');
  });

  it('should return empty string if phone number length is less than 10', () => {
    expect(trimPhoneNumber('1212')).toBe('');
  });

  it('should return empty string if phone number is not string', () => {
    expect(trimPhoneNumber(false)).toBe('');
  });

  it('should return 9001234567 if phone number is 9001234567', () => {
    expect(trimPhoneNumber('9001234567')).toBe('9001234567');
  });

  it('should return 9001234567 if phone number is +79001234567', () => {
    expect(trimPhoneNumber('+79001234567')).toBe('9001234567');
  });

  it('should return 1234567 if phone number is +79001234567 and trimLength is 7', () => {
    expect(trimPhoneNumber('+79001234567', { trimLength: 7 })).toBe('1234567');
  });

  it('should return 81234567 if phone number is +79001234567 and trimLength is 7 and prefix is 8', () => {
    expect(
      trimPhoneNumber('+79001234567', { trimLength: 7, prefix: '8' })
    ).toBe('81234567');
  });

  it('should return 89001234567 if phone number is +79001234567 and prefix is 8', () => {
    expect(trimPhoneNumber('+79001234567', { prefix: '8' })).toBe(
      '89001234567'
    );
  });
});
