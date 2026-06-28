import { describe, it, expect } from 'vitest';
import { validateEmail, validateUserForm } from '../utils/validation';

describe('Validation Helpers', () => {
  describe('validateEmail', () => {
    it('should return true for valid emails', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name+tag@example.co.uk')).toBe(true);
    });

    it('should return false for invalid emails', () => {
      expect(validateEmail('test')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('test@example')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateUserForm', () => {
    it('should return no errors for a valid form', () => {
      const validData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        department: 'Engineering'
      };
      
      const errors = validateUserForm(validData);
      expect(Object.keys(errors).length).toBe(0);
    });

    it('should return errors for empty fields', () => {
      const invalidData = {
        firstName: '',
        lastName: '  ',
        email: '',
        department: ''
      };
      
      const errors = validateUserForm(invalidData);
      expect(errors.firstName).toBe('First Name is required');
      expect(errors.lastName).toBe('Last Name is required');
      expect(errors.email).toBe('Email is required');
      expect(errors.department).toBe('Department is required');
    });

    it('should return error for invalid email format', () => {
      const invalidData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        department: 'Engineering'
      };
      
      const errors = validateUserForm(invalidData);
      expect(errors.email).toBe('Invalid email format');
    });
  });
});
