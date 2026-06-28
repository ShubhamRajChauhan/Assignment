import { DEPARTMENTS } from './constants';

// Helper to assign a cyclical department to a user if not present
export const assignCyclicDepartment = (index) => {
  return DEPARTMENTS[index % DEPARTMENTS.length];
};

// Helper to generate a placeholder ID if needed
export const generateId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

// Helper to extract first and last name from full name
export const splitName = (fullName) => {
  const parts = fullName.trim().split(' ');
  const firstName = parts[0] || '';
  const lastName = parts.length > 1 ? parts.slice(1).join(' ') : '';
  return { firstName, lastName };
};
